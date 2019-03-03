import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          me {
            id
            name
          }
        }
      `
    })
    .then(({ data }) => {
      console.info('ql:', data)
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
