
import NextAuth, { type DefaultSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { Account, User } from "./lib/models";


declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      isOAuth?: boolean; // Optional if not all users are OAuth users
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: "ADMIN" | "USER";
    isOAuth?: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return;
      }

      const existingUser = await User.findById(user.id);

      if (!existingUser?.emailVerified) return;
    },
    async linkAccount({ user }) {
      await User.updateOne({ _id: user.id }, { $set: { emailVerified: new Date() } });
    },
  },
  callbacks: {
    async session({ token, session }) {
      // Ensure that session.user.id and session.user.role are populated correctly
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";  // Enforce type safety here
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth as boolean;  // Safely assign isOAuth
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      

      // Fetch user from the database by ID
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(existingUser._id as string)

      const existingAccount = await Account.findOne({ userId: existingUser._id });
      // Assign the role and isOAuth flag to the token
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role || "USER";  // Default to "USER" if no role is found
      token.isOAuth =   false && existingAccount?.provider !== "credentials";  // Assuming non-credential accounts are OAuth

      return token;
    },
  },
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
});
