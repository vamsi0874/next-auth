"use server"
import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/mail'
import { User } from '@/lib/models'
import { generateVerificationToken } from '@/lib/tokens'
import { SettingsSchema } from '@/Schemas'
import * as z from 'zod'
import bcrypt from 'bcryptjs'


export const settings = async (
    values : z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()

    if(!user){
        return {error : "Unauthorized"}
    }

    const dbUser = await User.findById(user.id)

    
    if(!dbUser){
        return {error : "Unauthorized"}
    }
   if(user.isOAuth) {
     values.email = undefined
     values.password = undefined
     values.newpassword = undefined
   
   }

   if(values.email && values.email !== user.email) {
     const existingUser = await User.findOne({email:values.email})

     if(existingUser && existingUser.id!==user.id){
        return {error : "Email already in use"}
     }

     const verificationToken = await generateVerificationToken(values.email)

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )

  return { success : "Verification email sent" }
   }

   if(values.password && values.newpassword && dbUser.password){
     const passwordMatch =  bcrypt.compare(dbUser.password,values.password)

     if(!passwordMatch){
        return {error : "Incorrect password"}
     }

     const hashPassword = await bcrypt.hash(values.newpassword,10)

     values.password = hashPassword,
     values.newpassword = undefined
   }

   await User.updateOne({_id : dbUser.id}
    ,  {$set : {...values}}
   )


    return {success : 'Settings Updated'}
}