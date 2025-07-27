import { signIn } from '@/auth';
import { ThemeToggle } from '../components/shared/ThemeToggle';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <ThemeToggle></ThemeToggle>
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
