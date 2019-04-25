import React from "react"
import cookie from "cookie"
import PropTypes from "prop-types"
import { getDataFromTree } from "react-apollo"
import Head from "next/head"

import initApollo from "./init-apollo"

import checkLoggedIn from "../auth/checkLoggedIn"
import checkSupervisor from "../auth/checkSupervisor"
import checkLead from "../auth/checkLead"
import redirect from "../auth/redirect"

function parseCookies (req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options)
}

export default App => {
  return class WithData extends React.Component {
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
      )

      ctx.ctx.apolloClient = apollo
    
      const { loggedInUser } = await checkLoggedIn(ctx.ctx.apolloClient)
      const { supervisorSubmissions } = await checkSupervisor(ctx.ctx.apolloClient)
      const { leadSubmissions } = await checkLead(ctx.ctx.apolloClient)
      let isSupervisor
      let isLead
      
      if(ctx.ctx.req) {
        let url = await ctx.ctx.req.url
        
        if (url === "/login") {
          if (loggedInUser.me) {
            redirect(ctx.ctx, "/")
          }
        } else {
          !loggedInUser.me ? redirect(ctx.ctx, "/login") : null
          supervisorSubmissions.length === 0 ? isSupervisor = false : isSupervisor = true
          leadSubmissions.length === 0 ? isLead = false : isLead = true

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
              // supervisor={supervisorSubmissions}
              // lead={leadSubmissions}
              Component={Component}
              router={router}
              apolloClient={apollo}
              isSupervisor={isSupervisor}
              isLead={isLead}
              user={loggedInUser}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo"s store
      const apolloState = apollo.cache.extract()
      
      return {
        ...appProps,
        loggedInUser,
        supervisorSubmissions,
        leadSubmissions,
        isSupervisor,
        isLead,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next"s normal rendering pipeline
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().token
        }
      })
    }
    
    render () {
      const { loggedInUser, isLead, isSupervisor } = this.props
      
      return <App 
                {...this.props}
                apolloClient={this.apolloClient}
                isLead={isLead}
                isSupervisor={isSupervisor}
                user={loggedInUser.me ? loggedInUser.me.user : 0}
              />
    }
  }
}