import {Container, Divider, Typography} from "@mui/material";
import styles from '../styles/Home.module.css'
import client from '../util/apolloClient';
import {GET_LANDING} from '../graphql/pages/queries';
import {Parallax, useParallaxController} from 'react-scroll-parallax';


export default function Home({page}) {
    const parallaxController = useParallaxController();
    return (<Container maxWidth='lg' className={styles.container}>

        <main className={styles.main}>
            <Parallax translateY={[-80, 50]}>
                <img height={500} width={800}
                       src={page?.attributes?.Cover?.data?.attributes?.url}
                       alt={page?.attributes?.Cover?.data?.attributes?.caption}
                       onLoad={() => parallaxController.update()}
                />
            </Parallax>

            <Typography variant='h2' textAlign={'center'} className={styles.parallax} gutterBottom>
                {page?.attributes?.Title}
            </Typography>
            <Typography variant='subtitle1' textAlign={'center'} className={styles.parallax}>
                {page?.attributes?.Description}
            </Typography>
            <br/>

            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Certifications
                </Divider>
                <div>
                    {page?.attributes?.certifications?.data.map((cert, i) => {
                        return (<div key={i} className={styles.certification}>
                            <img src={cert?.attributes?.Logo?.data?.attributes?.url}
                                   alt={cert?.attributes?.Name}
                                   height={100}
                                   width={100}
                                   />
                            <br/>
                            <Typography variant='h5' textAlign={'center'}>
                                {cert?.attributes?.Name}
                            </Typography>
                        </div>)
                    })}
                </div>
            </Container>

            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Projects
                </Divider>

                <div>
                    {page?.attributes?.projects?.data.map((project, i) => {
                        return (<div key={i} className={styles.card}>
                            <a href={project?.attributes?.Url}
                               target={'_blank'}
                               rel="noopener noreferrer">
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
            </Container>
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
    </Container>)
}

export async function getStaticProps() {
    const {data} = await client.query({
        query: GET_LANDING
    });
    return {
        props: {
            page: data.landingPage.data
        },
        revalidate: 60
    }
}
