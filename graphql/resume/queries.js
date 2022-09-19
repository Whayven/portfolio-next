import { gql } from "@apollo/client";

export const GET_RESUME = gql`
query GET_RESUME {
    resume {
      data {
        id
        attributes {
          Title
          Statement
          skills {
            data {
              id
              attributes {
                Name
              }
            }
          }
          works {
            data {
              id
              attributes {
                Title
                Company
                Start
                End
                Description
                Details
              }
            }
          }
          projects {
            data {
              id
              attributes {
                Title
                Description
              }
            }
          }
        }
      }
    }
  }
`