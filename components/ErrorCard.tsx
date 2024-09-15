import React from 'react'
import { CardWrapper } from "./auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper 
    headerLabel="Oops! Something went wrong"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
    >
        <div>
            <ExclamationTriangleIcon/>
        </div>
    </CardWrapper>
  )
}

