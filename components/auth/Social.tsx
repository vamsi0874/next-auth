// "use client"
// import React from 'react'
// import { FaGithub } from 'react-icons/fa6'
// import { FcGoogle } from 'react-icons/fc'
// import { Button } from '../ui/button'
// import { signIn } from 'next-auth/react'
// import { DEFAULT_LOGIN_REDIRECT } from '@/routes'


// export const Social = () => {

//   const onClick = (provider: "google" | "github")=>{
//         signIn(provider, {
//           callbackUrl:DEFAULT_LOGIN_REDIRECT
//         }) 
//   } 
//   return (
//     <div>
//        <Button onClick={()=>onClick('google')}>
//          <FcGoogle/>
//         </Button>
//        <Button onClick={()=>onClick('github')}> 
//           <FaGithub />
//         </Button>  

//     </div>
//   )
// }

"use client";
import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";


export const Social = () => {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex space-x-4 justify-center">
      <Button
        onClick={() => onClick("google")}
        className="flex items-center space-x-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
      >
        <FcGoogle className="text-xl" />
        <span>Sign in with Google</span>
      </Button>
      <Button
        onClick={() => onClick("github")}
        className="flex items-center space-x-2 bg-black text-white hover:bg-gray-800"
      >
        <FaGithub className="text-xl" />
        <span>Sign in with GitHub</span>
      </Button>
    </div>
  );
};

