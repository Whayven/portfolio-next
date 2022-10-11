import '../styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Head from "next/head";
import Nav from '../components/Nav';
import {StyledEngineProvider} from "@mui/material/styles";
import {ParallaxProvider} from "react-scroll-parallax";

function MyApp({Component, pageProps}) {
    return (
        <StyledEngineProvider injectFirst>
            <ParallaxProvider>
                <Head>
                    <title>Cloud Way</title>
                    <meta name="description" content="Wayne Foster Jr - 2022"/>
                    <link rel="icon" href="/favicon.png"/>
                </Head>
                <Nav/>
                <Component {...pageProps} />
            </ParallaxProvider>
        </StyledEngineProvider>

    )
}

export default MyApp
