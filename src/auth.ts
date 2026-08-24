import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { isOwnerEmail } from "@/lib/auth/admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/en-US/admin",
    error: "/en-US/admin",
  },
  callbacks: {
    async signIn({ user }) {
      if (isOwnerEmail(user.email)) return true;
      return "/en-US/admin?error=owner";
    },
  },
});
