import {gql} from "@apollo/client";

export const GET_POST = gql`
query GET_POST($postId: ID) {
  post(id: $postId) {
    data {
      id
      attributes {
        Title
        Content
        publishedAt
      }
    }
  }
}
`

export const GET_POSTS = gql`
query GET_POSTS {
posts {
    data {
      id
      attributes {
        Title
        Content
        Description
      }
    }
  }
}
`;