import {Container, Divider, Typography} from "@mui/material";
import styles from '../styles/Home.module.css'
import client from '../util/apolloClient';
import {GET_LANDING} from '../graphql/pages/queries';
import {useEffect} from "react";
import Image from "next/image";
import Link from "next/link";


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
                <Typography variant='subtitle1' textAlign={'center'}>
                    {page?.attributes?.Description}
                </Typography>
                <br/>
                <div className={styles.section}>
                    <Divider className={styles.divider}>
                        Certifications
                    </Divider>
                    <div>
                        {page?.attributes?.certifications?.data.map((cert, i) => {
                            return (
                                <div key={i} className={styles.certification}>
                                    <Image src={uri + cert?.attributes?.Logo?.data?.attributes?.url} height={100}
                                           width={100} layout={'fixed'}/>
                                    <br/>
                                    <Typography variant='h5'>
                                        {cert?.attributes?.Name}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.section}>
                    <Divider className={styles.divider}>
                        Projects
                    </Divider>

                    <div>
                        {page?.attributes?.projects?.data.map((project) => {
                            return (<div key={project?.Id} className={styles.card}>
                                <a href={project?.attributes?.Url} target={'_blank'}>
                                    <Typography variant='h2'>
                                        {project?.attributes?.Title}
                                    </Typography>
                                </a>
                                <br/>
                                <Typography variant='body2'>
                                    {project?.attributes?.Description}
                                </Typography>
                            </div>)
                        })}
                    </div>
                </div>
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
