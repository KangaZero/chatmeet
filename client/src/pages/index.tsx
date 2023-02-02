
import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';

import Chat from '../components/Chat/Chat';
import Auth from '../components/Auth/Auth';

import { Session } from 'next-auth';

const Home: NextPage = () => {

  const { data : session } = useSession();

  console.log('daataa', session?.user);

  const reloadSession = () => {

  };

  return (
    <Box border="1px solid black" background="yellow.200" height={100}>
      {session?.user?.username ? <Chat /> : <Auth session={session} reloadSession={reloadSession}/>}

      {/* <div>
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
      </div> */}

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