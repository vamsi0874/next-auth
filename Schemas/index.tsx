import { RoleGate } from '@/components/auth/role-gate'
import * as z from 'zod'


export const SettingsSchema = z.object({
    name:z.optional(z.string()),
    role:z.enum(['ADMIN','USER']),
    email:z.optional(z.string().email()),
    password:z.optional(z.string().min(6)),
    newpassword:z.optional(z.string().min(6))

}).refine((data)=>{
    if(data.password && !data.newpassword){
        return false
    }
    return true
}, {
    message:"New password is required",
    path: ["newpassword"]
})
.refine((data)=>{
    if(data.newpassword && !data.password){
        return false
    }
    return true
},{
    message:"Password is reqired",
    path:["password"]
})
export const LoginSchema = z.object({
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(1,{
        message:"password is required"
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message:"name is required"
    }),
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(6,{
        message:"min 6 characters is required"
    }),
  
})

export const ResetSchema = z.object({
    email: z.string().email({
        message:"email is required"
    }),
  
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message:"min of 6 char required"
    }),
  
})
