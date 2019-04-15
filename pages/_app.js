import App, { Container } from "next/app"
import React from "react"
import withApollo from "../lib/apollo/with-apollo-client"
import { ApolloProvider } from "react-apollo"

class Vault extends App {
  render () { 
    const { 
      loggedInUser,
      supervisorSubmissions,
      leadSubmissions,
      supervisorAuth,
      leadAuth,
      Component,
      pageProps,
      apolloClient 
    } = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component 
            {...pageProps} 
            user={loggedInUser}
            super={supervisorSubmissions}
            lead={leadSubmissions}
            supervisorAuth={supervisorAuth}
            leadAuth={leadAuth} 
          />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Vault)