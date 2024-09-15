"use server"

import { getVerificationTokenByToken } from "@/data/VerificationToken"
import { User } from "@/lib/models"
import { error } from "console"

 export const newVerification = async (token:string)=>{
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken){
        return {error : "Token has expired"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
        return {error : "token has expired"}
    }

    const existingUser = await User.findOne({email:existingToken.email})

    if(!existingUser){
        return {error : "Email does not exist!"} 
    }

    await User.updateOne(
        {_id: existingUser._id},
        {$set : {
         emailVerified : new Date(),
           email : existingToken.email
    }
  })
   await User.deleteOne({_id : existingToken.id})

   return { success : "Email Verified!"}
 }