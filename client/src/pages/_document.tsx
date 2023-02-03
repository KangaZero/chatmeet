import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../chakra/theme';


export default class Document extends NextDocument {
  rende() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
  }
}
