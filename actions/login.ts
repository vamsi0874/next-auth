
"use server";
import * as z from "zod";
import { LoginSchema } from "@/Schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { connectToDb } from "@/lib/dbc";
import { generateVerificationToken } from "@/lib/tokens";
import { User } from "@/lib/models";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?:String
) => {
  
  await connectToDb();
  console.log('login page')

  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;
 
  const existingUser = await User.findOne({email})

  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error: "Email does not exist"}
  }
  
  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return {success : "Confirmation email sent"}
  }

 

  try {
    // Attempt to sign in using credentials
    const result = await signIn("credentials", {
      email,
      password,
      // redirectTo:DEFAULT_LOGIN_REDIRECT,
      redirect: false, // Prevent automatic redirect
      callbackUrl: DEFAULT_LOGIN_REDIRECT, // Properly handle redirect URL
    });

    if (result?.error) {
      return { error: result.error };
    }

    // Return success response along with redirect URL
    return { success: "Signed in successfully", redirectUrl: result.url || DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    console.log('login errorrr')
    if (error instanceof AuthError) {

      switch (error.type) {
        case "CredentialsSignin":
          console.log('hihhhhhhhh')
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
 throw error
  }
};


