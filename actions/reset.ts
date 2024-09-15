"use server"
import { connectToDb } from '@/lib/dbc'
import { sendPasswordResetEmail } from '@/lib/mail'
import { User } from '@/lib/models'
import { generatePasswordResetToken } from '@/lib/tokens'
import { ResetSchema } from '@/Schemas'
import * as z from 'zod'

export const reset = async (values : z.infer<typeof ResetSchema>) => {
   const validateFields = ResetSchema.safeParse(values)

   if(!validateFields.success){
    return {error : "Invalid email"}
   }

   const {email} = validateFields.data
   await connectToDb()
   const existingUser = await User.findOne({email})

   if(!existingUser) {
    return {error : "Email not found!"}
   }

   const passwordResetToken = await generatePasswordResetToken(email)

   await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
   )

   return {success : "Reset email sent"}
}
