import {Container, Divider, Typography} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import styles from '../styles/Home.module.css'
import {initializeApollo} from '../util/apolloClient';
import {GET_LANDING} from '../graphql/pages/queries';
import {Parallax, useParallaxController} from 'react-scroll-parallax';
import process from "../next.config";
import {useState} from "react";
import Image from "next/image";
import BasicCard from "../components/Card";


export default function Home({page}) {
    const [uri] = useState('http://localhost:1337');
    const parallaxController = useParallaxController();
    return (<Container maxWidth='lg' className={styles.container}>

        {/* Main Parallax Image */}
        <main className={styles.main}>
            <Parallax translateY={[-80, 50]}>
                <Image height={400} width={800} layout={'intrinsic'}
                       src={process.env.NODE_ENV === 'development' ? uri + page?.attributes?.Cover?.data?.attributes?.url : page?.attributes?.Cover?.data?.attributes?.url}
                       alt={page?.attributes?.Cover?.data?.attributes?.caption}
                       onLoad={() => parallaxController.update()}
                       priority={true}
                />
            </Parallax>

            {/* Landing Head Info */}
            <Container className={styles.parallax}>
                <div className={styles.parallaxCard}>
                    <Typography variant='h2' textAlign={'center'} gutterBottom>
                        {page?.attributes?.Title}
                    </Typography>

                    <Typography variant='body1' textAlign={'center'} paragraph gutterBottom>
                        {page?.attributes?.Description}
                    </Typography>
                </div>
            </Container>
            <br/>

            {/* Certifications Section */}
            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Certifications
                </Divider>
                <div className={styles.certificationsList}>
                    {page?.attributes?.certifications?.data.map((cert, i) => {
                        return (<div key={i} className={styles.certification}>
                            <Image
                                src={process.env.NODE_ENV === 'development' ? uri + cert?.attributes?.Logo?.data?.attributes?.url : cert?.attributes?.Logo?.data?.attributes?.url}
                                alt={cert?.attributes?.Name}
                                height={100}
                                width={100}
                                layout={'fixed'}/>
                            <br/>
                            <Typography variant='h5' textAlign={'center'}>
                                {cert?.attributes?.Name}
                            </Typography>
                        </div>)
                    })}
                </div>


            </Container>
            {/* Projects Section */}
            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Projects
                </Divider>
                <Carousel interval={8000}
                          animation={"slide"}
                          duration={800}
                          indicators={false}
                          className={styles.carousel}
                          indicatorIconButtonProps={{
                              style: {
                                  padding: '3px'
                              }
                          }}
                          indicatorContainerProps={{
                              style: {
                                  marginTop: '1.5rem',
                              }
                          }}>
                    {/* Loop through projects data and display */}
                    {page?.attributes?.projects?.data.map((project, i) => {
                        return (<BasicCard key={i} className={styles.card} infoObject={{
                            Title: project?.attributes?.Title,
                            Description: project?.attributes?.Description,
                            Url: project?.attributes?.Url,
                            externalUrl: true
                        }}/>)
                    })}
                </Carousel>
            </Container>
            {/* Projects Section */}
            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Blog Posts
                </Divider>
                <Carousel interval={8000}
                          animation={"slide"}
                          duration={800}
                          indicators={false}
                          className={styles.carousel}
                          indicatorIconButtonProps={{
                              style: {
                                  padding: '3px'
                              }
                          }}
                          indicatorContainerProps={{
                              style: {
                                  marginTop: '1.5rem',
                              }
                          }}>
                    {/* Loop through posts data and display */}
                    {page?.attributes?.posts?.data.map((post, i) => {
                        return (<BasicCard key={i} className={styles.card} infoObject={{
                            Title: post?.attributes?.Title,
                            Description: post?.attributes?.Description,
                            Url: post?.id
                        }}/>)
                    })}
                </Carousel>
            </Container>
        </main>
    </Container>)
}

export async function getStaticProps() {
    const client = initializeApollo();
    const {data} = await client.query({
        query: GET_LANDING
    });
    return {
        props: {
            page: data.landingPage.data
        }
    }
}
