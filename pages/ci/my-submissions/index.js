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
import ActiveSubmissions from "../../../components/submissions/users/active"
import CompletedSubmissions from "../../../components/submissions/users/complete"
import ArchivedSubmissions from "../../../components/submissions/users/archived"

class PreviousSubmissions extends Component {
    render() {
        const { router, user, isSupervisor, isLead, isAdmin } = this.props

        return (
            <ApolloConsumer>
                {client => (
                    <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>
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
                                    <Text size="12px" color="lighterBlack" style={{ textAlign: "center" }}>Number of Submissions</Text>
                                    <UserSubmissionsCount id={user.id} />
                                </Box>
                                <Box
                                    width="33.33%"
                                    align="center"
                                    border={{ width: "1px", side: "right", color: "lightGray" }}
                                >
                                    <Text size="12px" color="lighterBlack" style={{ textAlign: "center" }}>Last Reward</Text>
                                    <UserLastReward id={user.id} />
                                </Box>
                                <Box 
                                    width="33.33%"
                                    align="center"
                                >
                                    <Text size="12px" color="lighterBlack" style={{ textAlign: "center" }}>Submissions Implemented</Text>
                                    <SubmissionsImplemented id={user.id} />
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
                                        pad={{ vertical: "25px", horizontal: "15px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >   
                                        <InProgressSubmissions route={router.route} userId={user.id} />
                                    </Box>
                                </Tab>
                                <Tab title="Active">
                                    <Box pad={{ vertical: "25px", horizontal: "15px" }}>
                                        <ActiveSubmissions route={router.route} userId={user.id} />
                                    </Box>
                                </Tab>
                                <Tab title="Complete">
                                    <Box 
                                        pad={{ vertical: "25px", horizontal: "15px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >
                                        <CompletedSubmissions route={router.route} userId={user.id} />
                                    </Box>
                                </Tab>
                                <Tab title="Archived">
                                    <Box 
                                        pad={{ vertical: "25px", horizontal: "15px" }}
                                        justify="center"
                                        alignContent="center"
                                        align="center"
                                    >
                                        <ArchivedSubmissions route={router.route} userId={user.id} />
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
