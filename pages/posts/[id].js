import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {GET_POSTS} from "../../graphql/posts/queries";
import {GET_POST} from "../../graphql/posts/queries";
import {Typography} from "@mui/material";
import {initializeApollo, addApolloState} from '../../util/apolloClient'
import moment from "moment/moment";

import styles from "../../styles/Post.module.css";

export default function Post({post}) {
    const formatDate = date => moment(date).format('dddd, MMMM Do YYYY');
    return (
        <>
            <div className={styles.post}>
                <Typography variant={'h3'} textAlign={'left'}
                            className={styles.postTitle}>
                    {post?.data?.attributes?.Title}
                </Typography>
                <Typography variant={'subtitle1'} sx={{
                    padding: '0.8rem 0 0 2rem',
                    cursor: 'default'
                }}>{formatDate(post?.data?.attributes?.publishedAt)}</Typography>
                <br/>
                <Typography variant={'body1'} textAlign={'left'} className={styles.postContent}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post?.data?.attributes?.Content}</ReactMarkdown>
                </Typography>
            </div>

        </>
    )
}


// `getStaticPaths` requires using `getStaticProps`
export async function getStaticPaths() {
    const client = initializeApollo();
    const {data} = await client.query({
        query: GET_POSTS
    });

    const paths = data.posts.data.map((post) => {
        return {params: {id: post.id}};
    });

    // Using fallback: "blocking" here enables preview mode for unpublished blog slugs
    // on production
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const client = initializeApollo();
    const blogPost = await client.query({
        query: GET_POST,
        variables: {postId: params.id}
    })

    // Add this with fallback: "blocking"
    // So that if we do not have a post on production,
    // the 404 is served
    if (!blogPost) {
        return {
            notFound: true,
        };
    }

    return addApolloState(client, {
        props: {
            post: blogPost.data.post
        },
        revalidate: 1,
    })
}

