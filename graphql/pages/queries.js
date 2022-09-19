import {gql} from "@apollo/client";

export const GET_LANDING = gql`
query GET_LANDING {
  landingPage {
    data {
      attributes {
        Title
        Description
        Cover {
          data {
            attributes {
              url
              caption
            }
          }
        }
      }
    }
  }
}
`