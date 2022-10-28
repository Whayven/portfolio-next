import {GET_POSTS} from "../graphql/posts/queries";
import {initializeApollo} from "../util/apolloClient";
import {Button, Container, Divider, Typography} from "@mui/material";

import styles from '../styles/Home.module.css'
import Link from "next/link";


export default function Blog({page}) {
    return (
        <>
            <Container sx={{margin: '1rem auto'}}>
                <Divider className={styles.divider}>
                    <Typography variant={'h4'} sx={{padding: 0, margin: 0}}>Blog</Typography>
                </Divider>

                {page?.data.map((post, i) => {
                    return (<div key={i} className={styles.parallaxCard}>
                        <Typography variant='h4'>
                            {post?.attributes?.Title}
                        </Typography>
                        <br/>
                        <Typography variant='body2' gutterBottom>
                            {post?.attributes?.Description}
                        </Typography>
                        <br/>
                        <Link href={`/posts/${post?.id}`}>
                            <Button variant={'text'} className={styles.linkButton}>View Post</Button>
                        </Link>
                    </div>)
                })}

            </Container>

        </>
    );
}

export async function getStaticProps() {
    const client = initializeApollo();
    const {data} = await client.query({
        query: GET_POSTS
    });
    return {
        props: {
            page: data.posts,
        }
    }
}