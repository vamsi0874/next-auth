import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "../data/VerificationToken"
import { PasswordResetToken, VerificationToken } from "@/lib/models"
import { connectToDb } from "@/lib/dbc"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"


export const generatePasswordResetToken = async (email:string)=>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime()+3600*1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if(existingToken) {
        await PasswordResetToken.deleteOne({_id:existingToken.id})
    }

    const passwordResetToken = await PasswordResetToken.create({
        email,token,expires
    })

    return passwordResetToken
}

export const generateVerificationToken = async (email:string)=>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime()+3600*1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await VerificationToken.deleteOne({_id:existingToken.id})
    }

    // await connectToDb()

    const verificationToken = await VerificationToken.create({
        email,token,expires
    })

    return verificationToken
}

