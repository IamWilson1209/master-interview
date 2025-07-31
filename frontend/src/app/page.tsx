import { signIn } from '@/auth';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </main>
  );
}
