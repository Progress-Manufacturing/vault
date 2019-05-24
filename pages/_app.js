import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '../lib/apollo/with-apollo-client';
import { ApolloProvider } from 'react-apollo';

class Vault extends App {
  render () { 
    const { 
      user,
      supervisorSubmissions,
      leadSubmissions,
      me,
      supervisor,
      Component,
      pageProps,
      apolloClient,
      

    } = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component
            {...pageProps} 
            user={user}
            isSupervisor={supervisorSubmissions ? (supervisorSubmissions.length === 0 ? false : true ) : false}
            isLead={leadSubmissions ? (leadSubmissions.length === 0 ? false : true) : false} 
            isAdmin={user.admin === 0 ? false : true}
            me={me}
            supervisor={supervisor}
          />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Vault)