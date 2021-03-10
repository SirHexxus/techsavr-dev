import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

import theme from '@/styles/theme';
import { AuthProvider } from '@/lib/auth';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
// import '@/styles/globals.css';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
            background-color: #edf2f7;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} /*resetCSS={false}*/>
      <AuthProvider>
        <GlobalStyle>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyle>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
