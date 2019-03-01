import React, { Component } from "react"
import Main from "../lib/layout/login"
import { Button } from "grommet"
import { Windows } from "grommet-icons"

import jsCookie from "js-cookie"
import Cookies from "next-cookies"
import jwtDecode from "jwt-decode"
import * as Msal  from "msal"
import { IdToken } from "../node_modules/msal/lib-commonjs/IdToken"
import Authentication from "../lib/auth/msal-auth"


class Login extends Component {
  static getInitialProps(context ) {
    const userAgent = context.req ? context.req.headers['user-agent'] : navigator.userAgent
    const isServer= !!context.req
    
    const { access_token }= Cookies(context)
    const login_user = access_token ? jwtDecode(access_token) : null

    if(login_user && isServer) {
      console.log(access_token)
    }

    return {userAgent: userAgent}
  }
  
  constructor(props) {
    super(props)
    this.state = {
      isAuth: this.props.user ? true : this.props.isAuth
    }
    this.auth = new Authentication()
  }

  initLogin = () => {
    if(!this.state.isAuth) {
    
      this.auth.login().then(token => {
        if(token !== null) {
          this.setState({ isAuth: true })
          let inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000)
          jsCookie.set("access_token", token, { expires: inSixtyMinutes })
        }
      })
    } else {
      jsCookie.remove("access_token");
      this.setState({ isAuth: false });
      this.auth.logout();
    }
  }

  handleLogClick=()=>{
    this.initLogin();
  }

  render() {
    return (
      <Main>
        <Button 
          className="LoginButton"
          color="#5558AF"
          plain={true}
          label="Signin with Microsoft"
          icon={<Windows size="20px" color="white" />}
          round="5px"
          className="LoginButton" 
          onClick={()=> this.handleLogClick()}
        />
        <style jsx global>{`
          button.LoginButton {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #5558AF;
            text-decoration: none;
            padding: 15px 25px;
            border-radius: 4px;
            color: white;
            transition: background-color 0.3s ease-in-out;
          }

          button.LoginButton:hover {
            background-color: #2B2B30;
          }
      `}</style>
      </Main>
    )
  }
}
export default Login