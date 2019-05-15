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
              <p style={{ fontSize: "14px" }}>
				Welcome to The Vault! <br><br>
				The Vault is Progress MFG’s portal to access different applications throughout the company. Do you need to put in a suggestion for continual improvement or safety? Did you just catch a co-worker living the company values and need to submit an iPoint? Do you need to submit a request for time off, or IT helpdesk, or maintenance? If you need to do any of these things, you have come to the right place!<br><br>
				The Vault also has links to important websites and access to company tools.  <br><br>
              </p>

            </Card>
          </Main>
        )}
      </ApolloConsumer>
    )
  }
}

export default Home