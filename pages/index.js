import Head from 'next/head'
import {Container, Divider, Typography} from "@mui/material";
import ReactMarkdown from "react-markdown";
import styles from '../styles/Home.module.css'
import client from '../util/apolloClient';
import {GET_RESUME} from '../graphql/resume/queries';


export default function Home({resume}) {

    return (
        <Container maxWidth='lg' className={styles.container}>
            <Head>
                <title>Wayne Foster Jr</title>
                <meta name="description" content="Wayne Foster Jr - 2022"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Typography variant='h3' gutterBottom textAlign='center'>
                    Wayne Foster Jr - {resume.data ? resume?.data?.attributes?.Title : 'Web Developer'}
                </Typography>

                <Typography variant='subtitle1' textAlign='center'>
                    {resume.data ? resume?.data?.attributes?.Statement : 'Lorem Imps um'}
                </Typography>

                <div className={styles.section}>
                    <Divider className={styles.divider}>
                        Skills
                    </Divider>

                    <div>
                        <ul>
                            {resume?.data?.attributes?.skills?.data.map((skillObj) => {
                                return <li key={skillObj?.Id}>{skillObj?.attributes?.Name}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className={styles.section}>
                    <Divider className={styles.divider}>
                        Projects
                    </Divider>

                    <div>
                        {resume?.data?.attributes?.projects?.data.map((project) => {
                            return (<div key={project?.Id} className={styles.card}>
                                <Typography variant='h2'>
                                    {project?.attributes?.Title}
                                </Typography>
                                <br/>
                                <Typography variant='body2'>
                                    {project?.attributes?.Description}
                                </Typography>
                            </div>)
                        })}
                    </div>
                </div>

                <div className={styles.section}>
                    <Divider className={styles.divider}>
                        Work
                    </Divider>

                    <div>
                        {resume?.data?.attributes?.works?.data.map((job) => {
                            return (<div key={job?.Id} className={styles.card}>
                                <Typography variant='h2'>
                                    {job?.attributes?.Company}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {job?.attributes?.Title}
                                </Typography>
                                <br/>
                                <Typography variant='body2'>
                                    {job?.attributes?.Description}
                                </Typography>
                                <ReactMarkdown>
                                    {job?.attributes?.Details}
                                </ReactMarkdown>
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
                    <span className={styles.logo}>
          </span>
                </a>
            </footer>
        </Container>
    )
}

export async function getStaticProps(context) {
    const {data} = await client.query({
        query: GET_RESUME
    });
    return {
        props: {
            resume: data.resume,
        }
    }
}
