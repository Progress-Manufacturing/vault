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
import UserLastReward from "../../../components/usersubmission/lastreward"
import UserSubmissionsCount from "../../../components/usersubmission/submissioncount"
import SubmissionsImplemented from "../../../components/usersubmission/submissionimplemented"

import InProgressSubmissions from "../../../components/submissions/users/inprogress"
import CompletedSubmissions from "../../../components/submissions/users/complete"
import ActiveSubmissions from "../../../components/submissions/users/active"

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
                        <Card>
                            <Box
                                direction="row"
                                flex={true}
                                fill={true}
                            >
                                <Box
                                    width="33.33%"
                                    align="center"
                                    border={{ width: "1px", side: "right", color: "lightGray" }}
                                >
                                    <Text size="12px" color="lighterBlack">Number of Submissions</Text>
                                    <UserSubmissionsCount id={this.props.loggedInUser.me.user.id} />
                                </Box>
                                <Box
                                    width="33.33%"
                                    align="center"
                                    border={{ width: "1px", side: "right", color: "lightGray" }}
                                >
                                    <Text size="12px" color="lighterBlack">Last Reward</Text>
                                    <UserLastReward id={this.props.loggedInUser.me.user.id} />
                                </Box>
                                <Box 
                                    width="33.33%"
                                    align="center"
                                >
                                    <Text size="12px" color="lighterBlack">Submissions Implemented</Text>
                                    {/* TODO: Figure out how we'll figure out if submission was implemented */}
                                    <SubmissionsImplemented id={this.props.loggedInUser.me.user.id} />
                                </Box>
                            </Box>
                        </Card>
                        <Card title="Your Submissions" tabs={true}>
                            <Tabs 
                                flex={true}
                                fill={true}
                                justify="start"
                            >
                                <Tab title="In Progress">
                                    <Box 
                                        pad={{ vertical: "25px", horizontal: "25px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >   
                                        <InProgressSubmissions route={router.route} userId={this.props.loggedInUser.me.user.id} />
                                        {/* TODO: Make into simple component */}
                                        {/* <Box flex={true} pad={{ vertical: "50px" }} justify="center" align="center">
                                            <Clear color="lighterBlack" size="40px"/>
                                            <Text color="lighterBlack" margin={{ vertical: "15px" }}>No New Submissions at this time</Text>        
                                        </Box> */}
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
