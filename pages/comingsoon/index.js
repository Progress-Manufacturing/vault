import { Component } from "react"
import { ApolloConsumer } from "react-apollo"

import Main from "../../lib/layout/main"
import Card from "../../components/card"
import { Text } from "grommet"

class Home extends Component {
  render() {
    const { user, isSupervisor, isLead, isAdmin } = this.props
    const userFirstName = (user.name).split(" ")[0]
    
    return (
      <ApolloConsumer>
        {client => (
          <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>          
            <Card title={`Welcome, ${userFirstName}`} highlight={true}>
              <Text color="black" style={{ fontSize: "24px", textAlign: "center", width: "100%" }}>
                Coming Soon!
              </Text>
            </Card>
          </Main>
        )}
      </ApolloConsumer>
    )
  }
}

export default Home