import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getSupervisorSubmissions {
            fetchSupervisorSubmissions {
                id
                description
          }
        }
      `
    })
    .then(({ data }) => {
      return { isSupervisor: data }
    })
    .catch(() => {
      // Fail gracefully
      return { isSupervisor: {} }
    })
