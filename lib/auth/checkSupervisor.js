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
      console.info()
      return { supervisorSubmissions: data.fetchSupervisorSubmissions }
    })
    .catch(() => {
      // Fail gracefully
      return { supervisorSubmissions: null }
    })
