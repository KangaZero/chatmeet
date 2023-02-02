import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/apollo-client';
// import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app'

import Navbar from '../components/Navbar/Navbar';

import theme from '../chakra/theme';


export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}
