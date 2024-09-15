// import { CardWrapper } from '@/components/auth/CardWrapper'
// import { LoginForm } from '@/components/auth/LoginForm'
// import React from 'react'
// LoginForm
//  const LoginPage = () => {
//   return (
//     <div>
//     <CardWrapper
//     headerLabel='welcome back'
//     backButtonLabel="Don't have an account"
//     backButtonHref="/auth/register"
//     showSocial
//     >
//       <LoginForm/>
//     </CardWrapper>
//     </div>
//   )
// }

// export default LoginPage

import { CardWrapper } from '@/components/auth/CardWrapper';
import { LoginForm } from '@/components/auth/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <CardWrapper
          headerLabel="Welcome Back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
        >
          <LoginForm />
        </CardWrapper>
      </div>
    </div>
  );
};

export default LoginPage;
