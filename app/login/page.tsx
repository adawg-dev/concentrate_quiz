"use client";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn('azure-ad', { callbackUrl: '/dashboard' })}>Sign in with Azure</button>
    </div>
  );
}
