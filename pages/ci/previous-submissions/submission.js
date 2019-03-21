import { Component } from "react"
import { withRouter } from "next/router"
import { ApolloConsumer } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import checkSupervisor from "../../../lib/auth/checkSupervisor"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"

import Authorization from "../../../lib/auth/msal-auth"
import { getUserSupervisor, getAllUsers } from "../../../lib/auth/msal-graph"


class Submission extends Component {
    static async getInitialProps (context, apolloClient) { 
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        const { supervisorSubmissions } = await checkSupervisor(context.apolloClient)
        let isSupervisor = false

        if(supervisorSubmissions) {
          isSupervisor = true
        }
        
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }

        return { loggedInUser, supervisorSubmissions, isSupervisor }
    }

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
        
        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={this.props.isSupervisor}>
                        <SubmissionProgress id={submissionId} />
                        <UserSubmission id={submissionId} users={this.state.users} userSupervisor={this.state.supervisor} isSupervisor={this.props.isSupervisor}/>
                    </Main>  
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(Submission)