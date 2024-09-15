
"use client"
import { CardWrapper } from "./CardWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'


import {  RegisterSchema } from "@/Schemas"
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

import { register } from "@/actions/register"
import { useState, useTransition } from "react"


export const RegisterForm = () => {
const [isPending, startTransition] = useTransition()
const [error, setError] = useState<string | undefined>("")
const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues : {     
      name:"",
      email: "",
      password:""
 
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>)=>{
    startTransition(()=>{
      console.log('eeeee',values)
      register(values).then((data)=>{
          setError(data.error);
          setSuccess(data.success)
        })
    })
      
  }

  return (
    <>
       <div>
      <CardWrapper
    headerLabel='create an account'
     backButtonLabel="Already have an account"
     backButtonHref="/auth/login"
    showSocial
    >
     <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
            <FormField
              control = {form.control}
              name = "name"
              render = {({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field}
                    placeholder="name"
                    type="name"
                    disabled={isPending}
                    />
            
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
              <FormField
              control = {form.control}
              name = "email"
              render = {({field})=>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field}
                    placeholder="email"
                    type="email"
                    disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
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
              Register
            </Button>
         </form>
     </Form>
    </CardWrapper>
    </div>
    
    </>
  )
}