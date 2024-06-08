"use client"
import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import LoginForm from './LoginForm';
import { signOut } from 'next-auth/react';


const Login = () => {
  const {data : session} = useSession();
  return (
    <>    { session ? (
        <main className='bg-[#EEEEEE]'>
            hello
        </main>
    ):(
        <>
            <LoginForm />
        </>
    )}
    </>

  )
}

export default Login