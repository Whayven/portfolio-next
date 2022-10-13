import ReactMarkdown from "react-markdown";
import {GET_POSTS} from "../../../graphql/posts/queries";
import {GET_POST} from "../../../graphql/posts/queries";
import {Typography} from "@mui/material";
import {initializeApollo, addApolloState} from '../../../util/apolloClient'
import moment from "moment/moment";

export default function Post({post}) {
    return (
        <>
            <Typography variant={'h2'} textAlign={'left'}
                        sx={{margin: '2rem 0 0 0', padding: '0rem 0 0 2rem', cursor: 'default'}}>
                {post?.data?.post?.data?.attributes?.Title}
            </Typography>
            <Typography variant={'subtitle1'} sx={{
                padding: '0.8rem 0 0 2rem',
                cursor: 'default'
            }}>{moment(post?.data?.post?.data?.attributes?.publishedAt).format('MMMM, dddd YYYY')}</Typography>
            <br/>
            <Typography variant={'body1'} textAlign={'left'} sx={{padding: '2rem', width: '80%'}
            }>
                <ReactMarkdown>{post?.data?.post?.data?.attributes?.Content}</ReactMarkdown>
            </Typography>
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
    const post = await client.query({
        query: GET_POST,
        variables: {postId: params.id}
    })

    // Add this with fallback: "blocking"
    // So that if we do not have a post on production,
    // the 404 is served
    if (!post) {
        return {
            notFound: true,
        };
    }

    return addApolloState(client, {
        props: {post},
        revalidate: 1,
    })
}

