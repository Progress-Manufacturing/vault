import { Component } from "react"
import { withRouter } from "next/router"
import { ApolloConsumer } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import checkSupervisor from "../../../lib/auth/checkSupervisor"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"


class Submission extends Component {
    static async getInitialProps (context, apolloClient) { 
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        const { supervisorUser } = await checkSupervisor(context.apolloClient)
        let supervisorAuth = false
        
        if(supervisorUser) {
          supervisorAuth = true
        }
    
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser, supervisorUser, supervisorAuth }
    }

    // componentDidMount() {
    //     this.getUserData()
    // }

    // getSupervisorName = async () => {
    //     const auth = new Authorization()
      
    //     try {
    //       const token = await auth.getToken()
    //       const userData = await getUserById(token, this.props.)
    //     } catch(err) {
    //       console.log(err)
    //     }
    // }

    render(props) {
        const { router } = this.props
        const submissionId = parseInt(router.query.id)
        console.log(this.props.loggedInUser)
        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={this.props.supervisorAuth}>
                        <SubmissionProgress id={submissionId} />
                        <UserSubmission id={submissionId} />
                    </Main>  
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(Submission)