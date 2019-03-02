import gql from "graphql-tag"

export default apolloClient =>
    apolloClient.query({
        query: gql`
            query getUser ($email: String!) {
                fetchUser (email: "ctracy@progressmfg.com")  {
                    id
                    name
                }
            }
        `
    })
    .then(({ data }) => {
        console.info(data)
        return {}
    //   return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
    //   return { loggedInUser: {} }
        return {}
    }
)
