import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          me {
            token
            user {
              id
              name
            }
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
