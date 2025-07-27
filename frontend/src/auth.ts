import NextAuth, { type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import type { JWT } from "next-auth/jwt"

// 擴展 Session 和 JWT 的型別
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
    providerAccountId?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id as string
        token.provider = account?.provider
        token.providerAccountId = account?.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.provider = token.provider
      }
      return session
    },
    // ...existing code...
    async signIn({ user, account }) {
      if (process.env.MONGODB_URI && account && user.email) {
        try {
          const { MongoClient } = await import("mongodb")
          const client = new MongoClient(process.env.MONGODB_URI)
          await client.connect()

          const db = client.db()
          const users = db.collection('users')

          // 首先根據 email 查找使用者
          const existingUser = await users.findOne({ email: user.email })

          if (!existingUser) {
            // 如果使用者不存在，建立新使用者
            await users.insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              providers: [{
                provider: account.provider,
                providerAccountId: account.providerAccountId
              }],
              createdAt: new Date(),
              lastLoginAt: new Date()
            })
          } else {
            // 檢查此提供者是否已與此使用者關聯
            const hasProvider = existingUser.providers?.some(
              (p: { provider: string; providerAccountId: string }) =>
                p.provider === account.provider &&
                p.providerAccountId === account.providerAccountId
            );

            if (!hasProvider) {
              // 如果是新的提供者，將其加入到使用者的提供者列表中
              // 使用型別斷言來解決 TypeScript 型別檢查的問題
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const updateDoc: any = {
                $push: {
                  providers: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId
                  }
                },
                $set: { lastLoginAt: new Date() }
              };

              // 執行更新操作
              await users.updateOne(
                { email: user.email },
                updateDoc
              );
            } else {
              // 如果使用者存在且已有此提供者，只更新最後登入時間
              await users.updateOne(
                { email: user.email },
                { $set: { lastLoginAt: new Date() } }
              );
            }
          }

          await client.close()
        } catch (error) {
          console.error('Error saving user to MongoDB:', error)
        }
      }

      return true
    }
    // ...existing code...
  }
})