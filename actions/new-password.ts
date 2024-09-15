"use server"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { PasswordResetToken, User } from "@/lib/models"
import { NewPasswordSchema } from "@/Schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token : string | null )=>{
   if(!token){
    return {error : "Missing token!"}
   }

   
  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const {password} = validateFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if(hasExpired) {
      return {error : "token has expired"}
  }

  const existingUser = await User.findOne({email:existingToken.email})

  if(!existingUser){
      return {error : "Email does not exist!"} 
  }
/** */

const hashedPassword = await bcrypt.hash(password,10)
  await User.updateOne(
      {_id: existingUser._id},
      {$set : {
         password : hashedPassword
  }
})
 await PasswordResetToken.deleteOne({_id : existingToken.id})

 return { success : "Password updated!"}
 
}