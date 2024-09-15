
// "use client"
// import { CardWrapper } from "./CardWrapper"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from 'zod'

// import { ResetSchema } from "@/Schemas"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import { useForm  } from "react-hook-form"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import { FormError } from "../FormError"
// import { FormSuccess } from "../FormSuccess"
// import { useState, useTransition } from "react"
// import { reset } from "@/actions/reset"



// export const ResetForm = () => {
// const [isPending, startTransition] = useTransition()
// const [error, setError] = useState<string | undefined>("")
// const [success, setSuccess] = useState<string | undefined>("")


//   const form = useForm<z.infer<typeof ResetSchema>>({
//     resolver: zodResolver(ResetSchema),
//     defaultValues : {
//       email: "",
//     }
//   })

//   const onSubmit = (values: z.infer<typeof ResetSchema>)=>{
//     startTransition(()=>{
//       console.log('tttt')
//          reset(values).then((data)=>{
//           setError(data?.error);
//           setSuccess(data?.success)
//         })
//     })
      
//   }

//   return (
//     <>
//        <div>
//       <CardWrapper
//     headerLabel='Forgot password'
//      backButtonLabel="Back to login"
//      backButtonHref="/auth/login"
//     // showSocial
//     >
//      <Form {...form}>
//          <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div>
//               <FormField
//               control = {form.control}
//               name = "email"
//               render = {({field})=>(
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input {...field}
//                     placeholder="email"
//                     type="email"
//                     disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//               />
             
//             </div>
//             <FormError message={error}/>
//             <FormSuccess message={success}/>
//             <Button type="submit"
//             disabled={isPending}
//             >
//               Send reset Email
//             </Button>
//          </form>
//      </Form>
//     </CardWrapper>
//     </div>
    
//     </>
//   )
// }


"use client"
import { CardWrapper } from "./CardWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { ResetSchema } from "@/Schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { useState, useTransition } from "react"
import { reset } from "@/actions/reset"

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <CardWrapper
        headerLabel='Forgot password'
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      disabled={isPending}
                      className="bg-white border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              
            >
              Send Reset Email
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

