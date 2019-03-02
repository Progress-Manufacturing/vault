import Main from "../../lib/layout/login"
import { Box, Image } from "grommet"

import { Component } from "react"
import Cookies from "next-cookies"
import jwtDecode from "jwt-decode"
import Authentication from "../../lib/auth/msal-auth"
import checkUser from "../../lib/auth/checkUser";



class Home extends Component {
  static getInitialProps(context) {
    const userAgent = context.req ? context.req.headers['user-agent'] : navigator.userAgent

    const isServer = !!context.req
    
    const { access_token } = Cookies(context)
    const login_user = access_token ? jwtDecode(access_token) : null

    if(login_user && isServer)
    {
        console.log('the token (return): ', access_token)
    }

    return { userAgent: userAgent }
  }
  
  constructor(props) {
    super(props)
    this.auth = new Authentication()
  }

  render() {
    return (
      <Main>      
        <Box
            height="125px"
            pad="12px"
            align="center"
            justify="center"
        >
          <Image src="../../static/progress-logo.svg" fit="contain" alignSelf="center" style={{ maxHeight: "100%"}} />
        </Box>
      </Main>
    )
  }
}

export default Home