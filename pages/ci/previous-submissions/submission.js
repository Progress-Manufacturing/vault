import { Component } from "react"
import { withRouter } from "next/router"
import { ApolloConsumer } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"


class Submission extends Component {
    static async getInitialProps (context, apolloClient) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser }
    }

    render(props) {
        const { router } = this.props
        const submissionId = parseInt(router.query.id)

        return (
            <ApolloConsumer>
                {client => (
                    <Main avatar={this.props.avatar} admin={this.props.admin}>
                        <SubmissionProgress id={submissionId} />
                        <UserSubmission id={submissionId} />
                    </Main>  
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(Submission)