/* eslint-disable no-console */
import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

async function upsertUserToBackend(user: { email: string; name: string }) {
  try {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:3010';
    const response = await fetch(`${baseUrl}/api/v0/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
      }),
    });

    if (!response.ok) {
      console.error('Failed to upsert user to backend:', await response.text());
    } else {
      console.log('User successfully upserted to backend');
    }
  } catch (error) {
    console.error('Error upserting user to backend:', error);
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
    AzureADProvider({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: { email?: string | null; name?: string | null } }) {
      // This runs after successful authentication
      if (user.email && user.name) {
        console.log('User signed in:', user);
        console.log('Email:', user.email);
        console.log('Name:', user.name);
        await upsertUserToBackend({
          email: user.email,
          name: user.name,
        });
      }
      return true;
    },
    async session({ session }: { session: any }) {
      // Add any additional user data to the session if needed
      return session;
    },
  },
});
