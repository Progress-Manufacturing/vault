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
      isSupervisor,
      isLead,
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
            isSupervisor={isSupervisor}
            isLead={isLead} 
            isAdmin={user.admin}
          />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Vault)