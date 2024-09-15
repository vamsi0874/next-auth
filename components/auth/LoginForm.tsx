
// "use client"
// import { CardWrapper } from "./CardWrapper"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from 'zod'
// import Link from "next/link"
// import { LoginSchema } from "@/Schemas"
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
// import { login } from "@/actions/login"
// import { useState, useTransition } from "react"
// import { useSearchParams } from "next/navigation"


// export const LoginForm = () => {
// const [isPending, startTransition] = useTransition()
// const [error, setError] = useState<string | undefined>("")
// const [success, setSuccess] = useState<string | undefined>("")
// const searchParams = useSearchParams()
// const UrlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Email already in use with another provider" : ""
//   const form = useForm<z.infer<typeof LoginSchema>>({
//     resolver: zodResolver(LoginSchema),
//     defaultValues : {
//       email: "",
//       password:""
//     }
//   })

//   const onSubmit = (values: z.infer<typeof LoginSchema>)=>{
//     startTransition(()=>{
//       console.log('tttt')
//          login(values).then((data)=>{
//           console.log('jjjj',values)
//           setError(data?.error);
//           setSuccess(data?.success)
//         })
//     })
      
//   }

//   return (
//     <>
//        <div>
//       {/* <CardWrapper
//     headerLabel='welcome back'
//      backButtonLabel="Don't have an account"
//      backButtonHref="/auth/register"
//     showSocial
//     > */}
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
//               <FormField
//               control = {form.control}
//               name = "password"
//               render = {({field})=>(
//                 <FormItem>
//                   <FormLabel>password</FormLabel>
//                   <FormControl>
//                     <Input {...field}
//                     placeholder="*****"
//                     type="password"
//                     disabled={isPending}
//                     />
//                   </FormControl>
//                   <Button asChild>
//                     <Link href="/auth/reset">Forgot password?</Link>
//                   </Button>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//               />
//             </div>
//             <FormError message={error || UrlError}/>
//             <FormSuccess message={success}/>
//             <Button type="submit"
//             disabled={isPending}
//             >
//               Login
//             </Button>
//          </form>
//      </Form>
//     {/* </CardWrapper> */}
//     </div>
    
//     </>
//   )
// }

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { LoginSchema } from "@/Schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const router = useRouter()

   const callbackUrl = searchParams.get("callbackUrl")
  const UrlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        router.push('/settings')
      });
    });
  };

  return (
    <div className="bg-gray-50 p-2  rounded-lg shadow-md max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                      className="border-gray-300"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type="password"
                      className="border-gray-300"
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="text-right mt-2">
                    <Button variant="link" asChild>
                      <Link href="/auth/reset" className="text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error || UrlError} />
          <FormSuccess message={success} />

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full hover:bg-blue-700"
              disabled={isPending}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
