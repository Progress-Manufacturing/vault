import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import Head from 'next/head';

import initApollo from './init-apollo';

import Authentication from '../auth/msal-auth';
import checkLoggedIn from '../auth/checkLoggedIn';
import checkSupervisor from '../auth/checkSupervisor';
import checkLead from '../auth/checkLead';
import redirect from '../auth/redirect';

function parseCookies (req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export default App => {
  return class WithData extends React.Component {
    state = {
      me: {},
      userSupervisor: {}
    }
  
    componentDidMount() {
      this.getUserData();
    }

    getUserData = async () => {
      const graphUrl = 'https://graph.microsoft.com/v1.0';
      const auth = new Authentication();
  
      try {      
        const token = await auth.getToken();
        const getUserData = await auth.callMSGraph(false, token, `${graphUrl}/me?$select=businessPhones,displayName,givenName,jobTitle,mail,officeLocation,surname,userPrincipalName,id,department`);
        const getUserSupervisor = await auth.callMSGraph(false, token, `${graphUrl}/me/manager?$select=id,businessPhones,displayName,givenName,jobTitle,mail,officeLocation,surename,userPrincipalName,department`);
        
        this.setState({
          me: getUserData,
          userSupervisor: getUserSupervisor
        });
      } catch(err) {
        console.log(err)
      }
    }     

    static displayName = `WithData(${App.displayName})`
    static propTypes = {
      apolloState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {

      const { Component, router, ctx: { req, res } } = ctx
      
      const apollo = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token
        }
      );
      
      ctx.ctx.apolloClient = apollo

      const { loggedInUser } = await checkLoggedIn(ctx.ctx.apolloClient);
      const { supervisorSubmissions } = await checkSupervisor(ctx.ctx.apolloClient);
      const { leadSubmissions } = await checkLead(ctx.ctx.apolloClient);

      if(ctx.ctx.req) {
        let url = await ctx.ctx.req.url

        if (url === '/login') {
          if (loggedInUser.me) {
            redirect(ctx.ctx, '/')
          }
        } else {
          !loggedInUser.me ? redirect(ctx.ctx, '/login') : null
        }
      }

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      if (!process.browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              supervisorSubmissions={supervisorSubmissions}
              leadSubmissions={leadSubmissions}
              Component={Component}
              router={router}
              apolloClient={apollo}
              user={loggedInUser}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract()
      
      return {
        ...appProps,
        loggedInUser,
        supervisorSubmissions,
        leadSubmissions,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token
        }
      })
    }
    
    render () {
      const { loggedInUser, leadSubmissions, supervisorSubmissions } = this.props;
      const  { me, userSupervisor } = this.state;

      return <App 
                {...this.props}
                apolloClient={this.apolloClient}
                leadSubmissions={leadSubmissions ? leadSubmissions : 0}
                supervisorSubmissions={supervisorSubmissions ? supervisorSubmissions : 0}
                user={loggedInUser.me ? loggedInUser.me.user : 0}
                me={me}
                supervisor={userSupervisor}
              />
    }
  }
}