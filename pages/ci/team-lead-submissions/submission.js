import { Component } from "react"
import { withRouter } from "next/router"
import { ApolloConsumer } from "react-apollo"

import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"

import Authorization from "../../../lib/auth/msal-auth"


class Submission extends Component {
  state = { 
    users: null
  }

  componentDidMount() {
    // this.getAllUsers()
  }

  getAllUsers = async () => {
    const auth = new Authorization()

    try {
      const token = await auth.getToken()
      const allUsers = await getAllUsers(token)
      
      this.setState({
        users: allUsers
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { router, user, isSupervisor, isLead, isAdmin } = this.props
    const { users } = this.state
    const submissionId = parseInt(router.query.id)
      
    return (
        <ApolloConsumer>
            {client => (
              <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>
                <SubmissionProgress id={submissionId} />
                <UserSubmission id={submissionId} currentUserOid={user.oid} users={users} isAdmin={isAdmin} isLead={isLead} isSupervisor={isSupervisor}/>
              </Main>  
            )}
        </ApolloConsumer>
    )
  }
}

export default withRouter(Submission)