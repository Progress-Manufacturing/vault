import { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import { withRouter } from "next/router"

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
    render() {
        const { router, user, supervisorAuth, leadAuth } = this.props
        const currentUser = user.me.user

        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={supervisorAuth} lead={leadAuth}>
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
                                    <UserSubmissionsCount id={currentUser.id} />
                                </Box>
                                <Box
                                    width="33.33%"
                                    align="center"
                                    border={{ width: "1px", side: "right", color: "lightGray" }}
                                >
                                    <Text size="12px" color="lighterBlack">Last Reward</Text>
                                    <UserLastReward id={currentUser.id} />
                                </Box>
                                <Box 
                                    width="33.33%"
                                    align="center"
                                >
                                    <Text size="12px" color="lighterBlack">Submissions Implemented</Text>
                                    {/* TODO: Figure out how we'll figure out if submission was implemented */}
                                    <SubmissionsImplemented id={currentUser.id} />
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
                                        <InProgressSubmissions route={router.route} userId={currentUser.id} />
                                        {/* TODO: Make into simple component */}
                                        {/* <Box flex={true} pad={{ vertical: "50px" }} justify="center" align="center">
                                            <Clear color="lighterBlack" size="40px"/>
                                            <Text color="lighterBlack" margin={{ vertical: "15px" }}>No New Submissions at this time</Text>        
                                        </Box> */}
                                    </Box>
                                </Tab>
                                <Tab title="Active">
                                    <Box pad={{ vertical: "25px", horizontal: "25px" }}>
                                        <ActiveSubmissions route={router.route} userId={currentUser.id} />
                                    </Box>
                                </Tab>
                                <Tab title="Complete">
                                    <Box 
                                        pad={{ vertical: "25px", horizontal: "25px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >
                                        <CompletedSubmissions route={router.route} userId={currentUser.id} />
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
