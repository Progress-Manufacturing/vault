import App, { Container } from "next/app"
import React from "react"
import withApollo from "../lib/apollo/with-apollo-client"
import { ApolloProvider } from "react-apollo"

import Authorization from "../lib/auth/msal-auth"
import { getUserDetails } from "../lib/auth/msal-graph"

class Vault extends App {
  state = { 
    user: false, 
    me: null,
    manager: null,    
    avatar: null,
    admin: false
  }
  
  componentWillMount() {
    this.getUserData()
  }

  getUserData = async () => {
    const auth = new Authorization()
    let groupAdmin = false

    try {
      const token = await auth.getToken()
      const userData = await getUserDetails(token)


      userData.groups.value.map((group) => {
        if(group.id === 'f8bfb141-874b-491e-9114-b030640446e9') {
          groupAdmin = true
        }
      })

      this.setState({ 
        user: true,
        me: userData.me,
        manager: userData.manager,
        avatar: userData.avatar,
        admin: groupAdmin
      })
    } catch(err) {
      console.log(err)
    }
  }

  render () { 
    const { Component, pageProps, apolloClient } = this.props
    const { user } = this.state
    if(user) {
      return (
        <Container>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} {...this.state}/>
          </ApolloProvider>
        </Container>
      )
    } else {
      return null
    }
  }
}

export default withApollo(Vault)