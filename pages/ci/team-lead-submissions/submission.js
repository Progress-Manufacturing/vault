import { Component } from "react"
import { withRouter } from "next/router"
import { ApolloConsumer } from "react-apollo"

import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"

import Authorization from "../../../lib/auth/msal-auth"
import { getUserSupervisor, getAllUsers } from "../../../lib/auth/msal-graph"


class Submission extends Component {
  state = { 
    users: null
  }

  componentDidMount() {
    this.getAllUsers()
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
    const { router, user, supervisorAuth, leadAuth } = this.props
    const { users } = this.state
    const submissionId = parseInt(router.query.id)
    const currentUserOid = user.me.user.oid
      
    return (
        <ApolloConsumer>
            {client => (
              <Main supervisor={supervisorAuth} lead={leadAuth}>
                <SubmissionProgress id={submissionId} />
                <UserSubmission id={submissionId} currentUserOid={currentUserOid} users={users} isSupervisor={supervisorAuth}/>
              </Main>  
            )}
        </ApolloConsumer>
    )
  }
}

export default withRouter(Submission)