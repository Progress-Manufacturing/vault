import { Component } from "react"
import { ApolloConsumer } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import checkSupervisor from "../../../lib/auth/checkSupervisor"
import checkLead from "../../../lib/auth/checkLead"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import { Box, Tabs, Tab, Text } from "grommet"
import { Clear } from "grommet-icons";
import Card from "../../../components/card"
import SupervisorSubmissionPreview from "../../../components/supervisor/supervisorsubmissions"



class Team extends Component {
    static async getInitialProps (context, apolloClient) { 
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        const { supervisorSubmissions } = await checkSupervisor(context.apolloClient)
        const { leadSubmissions } = await checkLead(context.apolloClient)
        let supervisorAuth = false
        let leadAuth = false
        
        if((supervisorSubmissions.fetchSupervisorSubmissions).length !== 0) {
          supervisorAuth = true
        }
        
        if((leadSubmissions.fetchLeadSubmissions).length !== 0) {
          leadAuth = true
        }
    
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser, supervisorSubmissions, supervisorAuth, leadSubmissions, leadAuth }
    }

    render() {
        return(
            <ApolloConsumer>
                {client => (
                    <Main supervisor={this.props.supervisorAuth} lead={this.props.leadAuth}>
                    {/* <Card>
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
                                <Text size="12px" color="lighterBlack">Submissions That Need Review</Text>
                                <UserSubmissionsCount />
                            </Box>
                            <Box
                                width="33.33%"
                                align="center"
                                border={{ width: "1px", side: "right", color: "lightGray" }}
                            >
                                <Text size="12px" color="lighterBlack">Submission This Year</Text>
                                <UserLastReward />
                            </Box>
                            <Box 
                                width="33.33%"
                                align="center"
                            >
                                <Text size="12px" color="lighterBlack">Submissions Implemented</Text>
                                <Text size="32px" margin={{ top: "10px" }}>2</Text>
                            </Box>
                        </Box>
                    </Card> */}
                    <Card title="Your Teams Continual Improvement Submissions" tabs={true}>
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

                                    <SupervisorSubmissionPreview />            
                                    {/* TODO: Make into simple component */}
                                    {/* <Box flex={true} pad={{ vertical: "50px" }} justify="center" align="center">
                                        <Clear color="lighterBlack" size="40px"/>
                                        <Text color="lighterBlack" margin={{ vertical: "15px" }}>No New Submissions at this time</Text>        
                                    </Box> */}
                                </Box>
                            </Tab>
                            <Tab title="Active">
                                <Box pad={{ vertical: "25px", horizontal: "25px" }}>
                                    <SupervisorSubmissionPreview />            
                                </Box>
                            </Tab>
                            <Tab title="Completed">
                                <Box 
                                    pad={{ vertical: "25px", horizontal: "25px" }}
                                    justify="center"
                                    alignContent="center"
                                    align="center"
                                >
                                    {/* <SubmissionPreview progress={7} /> */}
                                </Box>
                            </Tab>
                        </Tabs>
                        {/* <SubmissionPreview /> */}
                    </Card>    
                  </Main>
                )}
            </ApolloConsumer>
        )
    }
}

export default Team