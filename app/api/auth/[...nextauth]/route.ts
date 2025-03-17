import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET || "",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Check if there's a redirect URL in sessionStorage
      // This is handled client-side in the CommentSection component
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
