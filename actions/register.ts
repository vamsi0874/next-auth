"use server"

import * as z from "zod";
import { RegisterSchema } from "@/Schemas";
import bcrypt from 'bcryptjs';
import { connectToDb } from "@/lib/dbc";
import { User } from "@/lib/models";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async ( values : z.infer<typeof RegisterSchema>) => {
    // Validate fields
    await connectToDb();
    console.log('iikik',values)
    const validateResult = RegisterSchema.safeParse(values);
    
    // Check if validation succeeded
    if (!validateResult.success) {
        console.log('Validation failed:', validateResult.error);
        return { error: "Invalid fields" };
    }

    // Validation passed, proceed with destructuring
    const { name, email, password } = validateResult.data;

   

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return { error: "Email already in use" };
    }

    await User.create({ name, email, password: hashedPassword });

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );
    return { success: "confirmation email sent" };
};
