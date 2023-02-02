import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {

  const { data } = useSession();

  console.log('daataa', data);


  return (
      <div>
        {data?.user ?
          <button 
          onClick={()  => signOut()}
          > 
            Sign Out 
          </button>
        :
          <button 
          onClick={()  => signIn('google')}
          > 
            Sign In 
          </button>
}
          <div>
            <h1>{data?.user?.name}</h1>
            <img
              src={data?.user?.image as string}
              alt={data?.user?.name as string}
              />
          </div>
      </div>
  )
}

export default Home;