import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '../lib/apollo/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import Authentication from '../lib/auth/msal-auth';

class Vault extends App {
  state = { 
    showSidebar: true,
    me: {},
    avatar: '../../static/avatar.svg'
  }
    
  // if (window.innerWidth <= 768) {
  //   this.setState({showSidebar: false })
  // }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const graphUrl = 'https://graph.microsoft.com/v1.0';
    const auth = new Authentication();
    
    try {
      const token = await auth.getToken();  
      const userData = await auth.callMSGraph(token, `${graphUrl}/me?$select=businessPhones,displayName,givenName,jobTitle,mail,officeLocation,surname,userPrincipalName,id,department`);
      
      // const userSupervisor = await auth.callMSGraph(token, `${graphUrl}/me/manager?$select=id,businessPhones,displayName,givenName,jobTitle,mail,officeLocation,surename,userPrincipalName,department`);
      // const tempAvatar = await auth.callMSGraph(token, `${graphUrl}/me/photo/$value`).responseType(graph.ResponseType.BLOB);
      // const avatar = this.setAvatar(tempAvatar.avatar);
      
      // this.setState({
      //   me: userData.me,
      //   userSupervisor: userSupervisor.supervisor,
      //   avatar: avatar
      // });
    } catch(err) {
      console.log(err)
    }
  }

  setAvatar = async (blob) => {
    if(blob) {
        const avatarImage = await URL.createObjectURL(blob);
        return avatarImage
    } else {
        return null
    }
  }
  
  
  render () { 
    const  { 
      me,
      userSupervisor,
      avatar 
    } = this.state
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
            isSupervisor={supervisorSubmissions ? (supervisorSubmissions.length === 0 ? false : true ) : false}
            isLead={leadSubmissions ? (leadSubmissions.length === 0 ? false : true) : false} 
            isAdmin={user.admin === 0 ? false : true}
            me={me}
            userSupervisor={userSupervisor}
            avatar={avatar}
          />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Vault)