import App, { Container } from "next/app"
import React from "react"
import withApollo from "../lib/apollo/with-apollo-client"
import { ApolloProvider } from "react-apollo"

class Vault extends App {
  render () { 
    const { 
      user,
      supervisorSubmissions,
      leadSubmissions,
      Component,
      pageProps,
      apolloClient 
    } = this.props
    
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component 
            {...pageProps} 
            user={user}
            // supervisor={supervisorSubmissions}
            // lead={leadSubmissions}
            isSupervisor={supervisorSubmissions.length === 0 ? false : true}
            isLead={leadSubmissions.length === 0 ? false : true} 
            isAdmin={user.admin === 0 ? false : true}
          />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Vault)