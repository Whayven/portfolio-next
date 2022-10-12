import {Container, Divider, Typography, Button} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import styles from '../styles/Home.module.css'
import client from '../util/apolloClient';
import {GET_LANDING} from '../graphql/pages/queries';
import {Parallax, useParallaxController} from 'react-scroll-parallax';
import ExportedImage from "next-image-export-optimizer";
import process from "../next.config";
import {useState} from "react";


export default function Home({page}) {
    const [uri] = useState('http://localhost:1337');
    const parallaxController = useParallaxController();
    return (<Container maxWidth='lg' className={styles.container}>

        {/* Main Parallax Image */}
        <main className={styles.main}>
            <Parallax translateY={[-80, 50]}>
                <ExportedImage height={400} width={800} layout={'intrinsic'}
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
                            <ExportedImage
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
                        return (<div key={i} className={styles.card}>
                            <a href={project?.attributes?.Url || ''}
                               target={'_blank'}
                               rel="noopener noreferrer">
                                <Typography variant='h2'>
                                    {project?.attributes?.Title}
                                </Typography>
                            </a>
                            <br/>
                            <Typography variant='body2' gutterBottom>
                                {project?.attributes?.Description}
                            </Typography>
                            <br/>
                            <Button variant={'text'} className={styles.linkButton}>Github</Button>
                        </div>)
                    })}
                </Carousel>

            </Container>
        </main>
    </Container>)
}

export async function getStaticProps() {
    const {data} = await client.query({
        query: GET_LANDING
    });
    return {
        props: {
            page: data.landingPage.data
        }
    }
}
