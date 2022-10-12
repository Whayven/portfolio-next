import {Container, Divider, Typography} from "@mui/material";
import ReactMarkdown from "react-markdown";
import styles from '../styles/Home.module.css'
import client from '../util/apolloClient';
import {GET_RESUME} from '../graphql/resume/queries';
import moment from "moment";


export default function Resume({resume}) {
    const formatDate = date => moment(date).format('MMMM Do YYYY');

    return (<Container maxWidth='lg' className={styles.container}>

        <main className={styles.main}>
            <Typography variant='h3' gutterBottom textAlign='center'>
                Wayne Foster Jr - {resume.data ? resume?.data?.attributes?.Title : 'Web Developer'}
            </Typography>

            <Typography variant='subtitle1' textAlign='center' gutterBottom>
                {resume.data ? resume?.data?.attributes?.Statement : 'Lorem Imps um'}
            </Typography>

            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Skills
                </Divider>

                <div>
                    <ul className={styles.skills}>
                        {resume?.data?.attributes?.skills?.data.map((skillObj, i) => {
                            return <li key={i}>{skillObj?.attributes?.Name}</li>
                        })}
                    </ul>
                </div>
            </Container>

            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Projects
                </Divider>

                <div>
                    {resume?.data?.attributes?.projects?.data.map((project, i) => {
                        return (<div key={i} className={styles.resumeCard}>
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
            </Container>

            <Container className={styles.section}>
                <Divider className={styles.divider}>
                    Work
                </Divider>

                <div>
                    {resume?.data?.attributes?.works?.data.map((job, i) => {
                        return (<div key={i} className={styles.resumeCard}>
                            <span className={styles.jobHeader}>
                                <Typography variant='h2'>
                                    {job?.attributes?.Company}
                                </Typography>
                                <Typography variant={'subtitle2'} className={styles.jobDate}>
                                    {formatDate(job?.attributes?.Start)} - {job?.attributes?.End ? job?.attributes?.End : 'Present'}
                                </Typography>
                            </span>

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
            </Container>
        </main>
    </Container>)
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
