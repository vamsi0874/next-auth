
"use client"
import { CardWrapper } from "./CardWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { NewPasswordSchema } from "@/Schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm  } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"



export const NewPasswordForm = () => {
const [isPending, startTransition] = useTransition()
const [error, setError] = useState<string | undefined>("")
const [success, setSuccess] = useState<string | undefined>("")
const searchParams = useSearchParams()

const token = searchParams.get("token")

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues : {
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>)=>{
    startTransition(()=>{
         newPassword(values,token).then((data)=>{
          setError(data?.error);
          setSuccess(data?.success)
        })
    })
      
  }

  return (
    <>
       <div>
      <CardWrapper
    headerLabel='Enter a new password'
     backButtonLabel="Back to login"
     backButtonHref="/auth/login"

    >
     <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
              control = {form.control}
              name = "password"
              render = {({field})=>(
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field}
                    placeholder="*****"
                    type="password"
                    disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
             
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit"
            disabled={isPending}
            >
               reset password
            </Button>
         </form>
     </Form>
    </CardWrapper>
    </div>
    
    </>
  )
}

