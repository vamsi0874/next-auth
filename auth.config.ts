import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginSchema } from "./Schemas"
import { User } from "./lib/models"
import bcrypt from 'bcryptjs'
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"


export default {
  providers: [
    Github({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {
        // Validate the credentials using Zod schema
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          // Fetch the user from the database using `await`
          const user = await User.findOne({ email });

          // Check if the user exists and has a password
          if (!user || !user.password) {
            return null; // Invalid credentials
          }

          // Compare the input password with the stored hashed password using `await`
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user; // Return user if password matches
          } else {
            return null; // Invalid credentials
          }
        }

        // Return null if validation fails
        return null;
      }
    })
  ],
} satisfies NextAuthConfig;
