import React, { Component } from "react"
import Main from "../lib/layout/login"
// import redirect from "../lib/auth/redirect"
// import checkLoggedIn from "../lib/auth/checkLoggedIn"
import LoginButton from "../components/login/loginbutton"

class Login extends Component {

  render() {
    return (
      <Main>
        <LoginButton/>
      </Main>
    )
  }
}

export default Login