import App, { Container } from "next/app"
import React from "react"
import withApolloClient from "../lib/apollo/with-apollo-client"
import { ApolloProvider } from "react-apollo"

class Vault extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps}/>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(Vault)