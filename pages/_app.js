import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Head from "next/head";
import Nav from '../components/Nav';
import { StyledEngineProvider} from "@mui/material/styles";

function MyApp({ Component, pageProps }) {
  return (
      <StyledEngineProvider>
        <Head>
          <title>Wayne Foster Jr</title>
          <meta name="description" content="Wayne Foster Jr - 2022"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Nav />
        <Component {...pageProps} />
      </StyledEngineProvider>

  )
}

export default MyApp
