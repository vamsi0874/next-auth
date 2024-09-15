import { PasswordResetToken } from "@/lib/models"


export const getPasswordResetTokenByToken = async (token:string) => {
   try {
      const passwordToken = await PasswordResetToken.findOne({token})

      return passwordToken
   } catch {
        return null
   }
}

export const getPasswordResetTokenByEmail = async (email:string) => {
   try {
      const passwordToken = await PasswordResetToken.findOne({email})

      return passwordToken
   } catch {
        return null
   }
}

