import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getLeadSubmissions {
            fetchLeadSubmissions {
                id
                description
          }
        }
      `
    })
    .then(({ data }) => {
      return { leadSubmissions: data.fetchLeadSubmissions }
    })
    .catch(() => {
      // Fail gracefully
      return { leadSubmissions: null }
    })
