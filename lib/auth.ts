import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: { params: { scope: 'openid profile email' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile.name as string | undefined;
        token.email = (profile as any).email as string | undefined;
        (token as any).oid = (profile as any).oid || token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).oid = (token as any).oid || token.sub;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
};
