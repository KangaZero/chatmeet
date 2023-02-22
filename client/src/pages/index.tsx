
import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import Navbar from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';

import Chat from '../components/Chat/Chat';
import Auth from '../components/Auth/Auth';

import { Session } from 'next-auth';

const Home: NextPage = () => {

  const { data : session } = useSession();

  // console.log('daataa', session?.user);

  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  return (
    <Box>

      {session?.user?.username 
      ?
      <Chat session={session} /> 
      : 
      <Auth session={session} reloadSession={reloadSession}/>
      }


    </Box>

  )
}

// To avoid sign in to show up on first glance
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}

export default Home;