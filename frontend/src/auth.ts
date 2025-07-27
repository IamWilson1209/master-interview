import NextAuth, { type DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import "next-auth/jwt"

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
    async signIn({ user, account }) {
      if (process.env.MONGODB_URI && account && user.email) {
        try {
          const { MongoClient } = await import("mongodb")
          const client = new MongoClient(process.env.MONGODB_URI)
          await client.connect()

          const db = client.db()
          const users = db.collection('users')

          const existingUser = await users.findOne({ email: user.email })

          if (!existingUser) {
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
            const hasProvider = existingUser.providers?.some(
              (p: { provider: string; providerAccountId: string }) =>
                p.provider === account.provider &&
                p.providerAccountId === account.providerAccountId
            );

            if (!hasProvider) {
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

              await users.updateOne(
                { email: user.email },
                updateDoc
              );
            } else {
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