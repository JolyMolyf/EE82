import React from 'react'
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-6 md:p-10 max-w-[1440px] mx-auto">
      <div className="w-full max-w-sm">
        <LoginForm  className='w-full'/>
      </div>
    </div>
  )
}

export default LoginPage;
