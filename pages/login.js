import React, { Component } from "react"
import Main from "../lib/layout/login"
import redirect from "../lib/auth/redirect"
import checkLoggedIn from "../lib/auth/checkLoggedIn"
import LoginButton from "../components/login/loginbutton"

class Login extends Component {
  static async getInitialProps (context) {    
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    
    if (loggedInUser.me) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {}
    
  }

  render() {
    return (
      <Main>
        <LoginButton/>
      </Main>
    )
  }
}

export default Login