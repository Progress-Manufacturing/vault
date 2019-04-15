import { Component } from "react"
import { withRouter } from "next/router"
import { ApolloConsumer } from "react-apollo"

import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"

import Authorization from "../../../lib/auth/msal-auth"
import { getUserSupervisor, getAllUsers } from "../../../lib/auth/msal-graph"


class Submission extends Component {
  constructor() {
      super()
      this.state = { 
        supervisor: null,
        users: null
      }
    }

    componentDidMount() {
        this.getSupervisor()
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

    getSupervisor = async () => {
        const auth = new Authorization()
      
        try {
          const token = await auth.getToken()
          const userSupervisor = await getUserSupervisor(token)
    
          this.setState({
            supervisor: userSupervisor.supervisor,
          })
        } catch(err) {
          console.log(err)
        }
      }

    render(props) {
        const { router } = this.props
        const submissionId = parseInt(router.query.id)
        const currentUserOid = this.props.loggedInUser.me.user.oid
        
        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={this.props.supervisorAuth} lead={this.props.leadAuth}>
                        <SubmissionProgress id={submissionId} />
                        <UserSubmission id={submissionId} currentUserOid={currentUserOid} users={this.state.users} userSupervisor={this.state.supervisor} isSupervisor={this.props.supervisorAuth}/>
                    </Main>  
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(Submission)