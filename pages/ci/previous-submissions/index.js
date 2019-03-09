import { Component } from "react"
import { ApolloConsumer } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import { Box, Text } from "grommet"
import Card from "../../../components/card"
import UserLastReward from "../../../components/usersubmission/lastreward"
import UserSubmissionsCount from "../../../components/usersubmission/submissioncount"
import SubmissionPreview from "../../../components/usersubmission/preview"
import SubmissionsImplemented from "../../../components/usersubmission/submissionimplemented"


class PreviousSubmissions extends Component {
    static async getInitialProps (context, apolloClient) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser }
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Main avatar={this.props.avatar}>
                        {console.log(this.props)}
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
                        <Card title="Your Previous Submissions">
                            <SubmissionPreview id={this.props.loggedInUser.me.user.id} />
                        </Card>
                    </Main>
                )}
            </ApolloConsumer>
        )
    }
}

export default PreviousSubmissions
