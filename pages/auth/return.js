import Main from "../../lib/layout/login"
import ReturnMutation from "../../components/login/returnmutations"
import React, { Component } from "react"

class AuthCallback extends Component {  
  render() {
    return (
      <Main> 
        <ReturnMutation/>
      </Main>
    )
  }
}

export default AuthCallback