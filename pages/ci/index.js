import React, { Component } from "react"
import { ApolloConsumer } from "react-apollo"

import Main from "../../lib/layout/main"
import Link from "next/link"
import { Button } from "grommet"
import Card from "../../components/card"

class CiHome extends Component {
  render() {
    const { user, isSupervisor, isLead, isAdmin } = this.props
    const userFirstName = (user.name).split(" ")[0]
    
    return (
      <ApolloConsumer>
        {client => (
          <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>
            <Card title={`Welcome, ${userFirstName}`} highlight={true}>
                <p style={{ fontSize: "14px" }}>
				One of Progress MFG, Inc.’s Corporate Values is <u>Improvement</u>. </br><br>
				The company values improvement in performance, products, and people.</br><br>
				We have developed the Continual Improvement program as an avenue for all employees to share their ideas on how to better improve our processes. Progress MFG. believes that each employee contributes directly to our growth and success. Who better to make the suggestions than the very people who are performing these processes every day? Put in your suggestions and help Progress MFG. to continually live our value of Improvement. </br><br>
				It is also a great way to get a little extra cash or at least a candy bar.</br><br>
                </p>
                <Link href="/ci/submit-improvement" passHref>
                <Button
                    className="SimpleButton"
                    label="Submit Continual Improvement"
                    pad="20px"
                />
                </Link>
            </Card>
          </Main>
        )}
      </ApolloConsumer>
      
    )
  }
}

export default CiHome