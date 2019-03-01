import { Component } from "react"
import jsCookie from "js-cookie"
import Cookies from "next-cookies"
import jwtDecode from "jwt-decode"
import * as Msal  from "msal"
import {IdToken} from "../node_modules/msal/lib-commonjs/IdToken"
import Authentication from "../lib/auth/msal-auth"
import Link from "next/link"

import Main from "../lib/layout/main"
import Card from "../components/card"
import { Button } from "grommet"

class Home extends Component {
  static getInitialProps(context ) {
    const userAgent = context.req ? context.req.headers['user-agent'] : navigator.userAgent

    const isServer= !!context.req
    
    const { access_token }= Cookies(context)
    const login_user = access_token ? jwtDecode(access_token) : null

    if(login_user && isServer)
    {
        console.log(access_token)
    }

    return { userAgent: userAgent }
  }
  
  constructor(props) {
    super(props)
    this.state={
      isAuth: this.props.user ? true : this.props.isAuth
    }
    this.auth = new Authentication()
  }

  componentDidMount(){
    if(!this.auth.getUser() && this.state.isAuth) {
      console.log('user not found')

      const idToken = new IdToken(this.props.token);
      const utid = '{your active directory domain id}'
      const uid = this.props.user.oid + '-' + this.props.user.tfp
      const clientInfo = { uid: uid ,utid: utid }
      const newUser = Msal.User.createUser(idToken, clientInfo, 'https://login.microsoftonline.com/common');

      this.auth.acquireUserTokenSilent(newUser).then(data => {
        const {newIdToken} = {...data}
        
        if(newIdToken) {
          jsCookie.remove('access_token')
          const inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000)
          jsCookie.set("access_token", newIdToken, {expires: inSixtyMinutes})
        }
      }).catch(error => {
        console.log(error)
      })
    }

    
    
    // console.log(this.auth.getUser());
    // const isLogedin= this.auth.getUser() ?  true :  false;
  }

  render() {
    return (
      <Main>      
        <Card title="Welcome" highlight={true}>
          <p style={{ fontSize: "14px" }}>
            Hello! Welcome to the world famous Continual Improvement App. It's world famous in that the world knows about it, pretty sure that makes you famous. Anyway, this is where you submit your absolutely brilliant idea to improve Progress Manufacturing. From there we'll decid if it's actually brilliant, because we can judge such things. Most likely it's just asking for a candy in the break room, so really not that brilliant. But hey, who doesn't like candy!? I mean, Hitler probably liked candy. Oh no, that means you and Hitler have something in common. Aw, that's actually a really depressing realization that Hitler was in fact just a human with small things he enjoyed like candy, which means he wasn't evil incarnate but just a man like you or I. Which means we have the same potential for such desctructive evil. Aw dear, that's really quite depressing.<br/>
            Moving on!<br/><br/>
            Submit ideas and get candy, cash, or just a solid pat on the back from Jed! I know most of you are hoping for the pat on the back, but Jed is a busy man and will at times send is liason James to give you a pat on the back; please be aware James is a bit touchy feely and the pat could possibly turn into a full fledged hug.<br/><br/>
            Below you'll find some exciting stats about our Continual Improvement Program.<br/><br/>
          </p>
          <Link href="/submit-improvement" passHref>
            <Button
              className="SimpleButton"
              label="Submit Continual Improvement"
              pad="20px"
            />
          </Link>
        </Card>
      </Main>
    )
  }
}

export default Home