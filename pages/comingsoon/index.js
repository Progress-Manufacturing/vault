import { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import Link from "next/link"

import Main from "../lib/layout/main"
import Card from "../components/card"
import { Button } from "grommet"

class Home extends Component {
  render() {
    const { user, isSupervisor, isLead, isAdmin } = this.props
    const userFirstName = (user.name).split(" ")[0]
    
    return (
      <ApolloConsumer>
        {client => (
          <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>          
            <Card title={`Welcome, ${userFirstName}`} highlight={true}>
              <p style={{ fontSize: "24px"; text-align:center; width:100%;}}>
                Coming Soon!
              </p>

            </Card>
          </Main>
        )}
      </ApolloConsumer>
    )
  }
}

export default Home