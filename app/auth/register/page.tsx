import { CardWrapper } from '@/components/auth/CardWrapper'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'
import React from 'react'
LoginForm
 const RegisterPage = () => {
  return (
    <div>
    {/* <CardWrapper
    headerLabel='welcome back'
    backButtonLabel="Don't have an account"
    backButtonHref="/auth/register"
    showSocial
    > */}
      <RegisterForm/>
    {/* </CardWrapper> */}
    </div>
  )
}

export default RegisterPage
