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
        projects {
          data {
            id
            attributes {
              Title
              Description
              Url
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        certifications {
          data {
            id
            attributes {
              Name
              Logo {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        posts {
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