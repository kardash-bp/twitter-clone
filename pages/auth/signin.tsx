import React from 'react'
import { GetServerSideProps } from 'next'
import { FcGoogle } from 'react-icons/fc'
import { getProviders, getSession, signIn, useSession } from 'next-auth/react'
import { TProvider } from '@/types'
import Image from 'next/image'
const SignIn = ({ providers }: TProvider) => {
  return (
    <div className='flex justify-center mt-24 gap-10'>
      <Image
        src='/twitter-login.png'
        alt='twitter login'
        width={300}
        height={300}
        className='hidden md:block'
      />
      <div className='text-gray-700'>
        {Object.values(providers).map((provider) => (
          <div className='' key={provider.id}>
            <h1 className='flex items-center text-2xl font-bold text-[#1da1f2] mb-8'>
              <Image src='/logo.png' width={68} height={68} alt='logo' />{' '}
              Twitter Clone Demo
            </h1>
            <a
              onClick={() => signIn(provider.id)}
              className='flex gap-2 items-center w-full justify-center py-2 bg-yellow-100 hover:text-[#1da1f2] rounded-md  border-transparent border-2  hover:border-[#1da1f2] transition-all duration-300 cursor-pointer'
            >
              <FcGoogle size={28} /> Sign In with{' '}
              <span className='font-bold'>{provider.name}</span>{' '}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const providers = await getProviders()
  console.log(context.query)
  if (session) {
    return {
      redirect: {
        destination: (context?.query?.callbackUrl as string) || '/',
        permanent: false,
      },
    }
  }
  return {
    props: { providers },
  }
}
