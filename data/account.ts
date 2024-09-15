import { Account } from "@/lib/models"

export const getAccountByUserId = async (userId:string)=>{
  try {
    const account = await Account.findById(userId)

    return account
  }
  catch {
    return null
  }
}