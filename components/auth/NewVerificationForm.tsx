"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./CardWrapper"
import {BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"


export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

    const searchparams = useSearchParams()

    const token = searchparams.get("token")

    const onSubmit = useCallback(()=>{
        if(!token) {
            setError("Missing token!")
            return
        }
        newVerification(token).then((data)=>{setSuccess(data.success)
       setError(data.error)}).catch(()=>{
        setError("Something went wrong")
       })
    },[token])

    useEffect(()=>{
        onSubmit()
    },[onSubmit])
  return (
    <CardWrapper
    headerLabel="Confirming your verification"
    backButtonLabel="Back to Login"
    backButtonHref="/auth/login"
    >
 <div>
    {!success && !error && (
        <BeatLoader/>
    )}
    
    <FormSuccess message={success}/>
    <FormError message={error}/>
 </div>
    </CardWrapper>
  )
}
