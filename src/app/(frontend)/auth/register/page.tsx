import React from 'react'
import { RegisterForm } from './RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-6 md:p-10 max-w-[1440px] mx-auto">
      <div className="w-full max-w-sm">
        <RegisterForm  className='w-full'/>
      </div>
    </div>
  )
}

export default RegisterPage;
