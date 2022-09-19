import Head from 'next/head'
import {Container, Divider, Typography} from "@mui/material";
import styles from '../styles/Home.module.css'
import client from '../util/apolloClient';
import {GET_LANDING} from '../graphql/pages/queries';
import {useEffect} from "react";
import Image from "next/image";


export default function Home({page}) {

    //TODO: GET URI FROM Process Env
    const uri = 'http://localhost:1337';

    useEffect(() => {
        console.log(page)
        console.log(page?.attributes?.Title)
    }, [])

    return (
        <Container maxWidth='lg' className={styles.container}>

            <main className={styles.main}>

                <Image height={400} width={800} layout={'intrinsic'}
                       src={uri + page?.attributes?.Cover?.data?.attributes?.url}/>

                <Typography variant='h2' gutterBottom>
                    {page?.attributes?.Title}
                </Typography>
                <Typography variant='subtitle1'>
                    {page?.attributes?.Description}
                </Typography>
            </main>


            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Next.js
                </a>
            </footer>
        </Container>
    )
}

export async function getStaticProps(context) {
    const {data} = await client.query({
        query: GET_LANDING
    });
    return {
        props: {
            page: data.landingPage.data
        }
    }
}
