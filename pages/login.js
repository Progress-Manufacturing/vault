import React, { Component } from "react"
import Main from "../lib/layout/login"
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