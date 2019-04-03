import { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import { withRouter } from "next/router"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import checkSupervisor from "../../../lib/auth/checkSupervisor"
import checkLead from "../../../lib/auth/checkLead"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import { Box, Text, Tabs, Tab } from "grommet"
import Card from "../../../components/card"

import NewSubmissions from "../../../components/submissions/supervisor/new"
import InProgressSubmissions from "../../../components/submissions/supervisor/inprogress"
import CompletedSubmissions from "../../../components/submissions/supervisor/complete"
import ActiveSubmissions from "../../../components/submissions/supervisor/active"

class PreviousSubmissions extends Component {
    static async getInitialProps (context, apolloClient) { 
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        const { supervisorSubmissions } = await checkSupervisor(context.apolloClient)
        const { leadSubmissions } = await checkLead(context.apolloClient)
        let supervisorAuth = false
        let leadAuth = false
        
        if(supervisorSubmissions.length !== 0) {
            supervisorAuth = true
        }
          
        if(leadSubmissions.length !== 0) {
            leadAuth = true
        }
    
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser, supervisorSubmissions, supervisorAuth, leadSubmissions, leadAuth }
    }

    render() {
        const { router } = this.props
        
        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={this.props.supervisorAuth} lead={this.props.leadAuth}>
                        <Card title="Your Departments Submissions" tabs={true}>
                            <Tabs 
                                flex={true}
                                fill={true}
                                justify="start"
                            >
                                <Tab title="New">
                                    <Box 
                                        pad={{ vertical: "25px", horizontal: "25px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >   
                                        <NewSubmissions route={router.route} userId={this.props.loggedInUser.me.user.id} />
                                    </Box>
                                </Tab>
                                <Tab title="In Progress">
                                    <Box pad={{ vertical: "25px", horizontal: "25px" }}>
                                        <InProgressSubmissions route={router.route} userId={this.props.loggedInUser.me.user.id} />
                                    </Box>
                                </Tab>
                                <Tab title="Active">
                                    <Box pad={{ vertical: "25px", horizontal: "25px" }}>
                                        <ActiveSubmissions route={router.route} userId={this.props.loggedInUser.me.user.id} />
                                    </Box>
                                </Tab>
                                <Tab title="Complete">
                                    <Box 
                                        pad={{ vertical: "25px", horizontal: "25px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >
                                        <CompletedSubmissions route={router.route} userId={this.props.loggedInUser.me.user.id} />
                                    </Box>
                                </Tab>
                            </Tabs>
                        </Card>

                    </Main>
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(PreviousSubmissions)
