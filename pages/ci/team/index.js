import { Component } from "react"
import { ApolloConsumer } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import redirect from "../../../lib/auth/redirect"

import Main from "../../../lib/layout/main"
import { Box, Tabs, Tab, Text } from "grommet"
import { Clear } from "grommet-icons";
import Card from "../../../components/card"
import SubmissionPreview from "../../../components/usersubmission/preview"


class Team extends Component {
    static async getInitialProps (context, apolloClient) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser }
    }

    render() {
        return(
            <ApolloConsumer>
                {client => (
                    <Main>
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
                                    <SubmissionPreview progress={1} />            
                                    {/* TODO: Make into simple component */}
                                    {/* <Box flex={true} pad={{ vertical: "50px" }} justify="center" align="center">
                                        <Clear color="lighterBlack" size="40px"/>
                                        <Text color="lighterBlack" margin={{ vertical: "15px" }}>No New Submissions at this time</Text>        
                                    </Box> */}
                                </Box>
                            </Tab>
                            <Tab title="Active">
                                <Box pad={{ vertical: "25px", horizontal: "25px" }}>
                                    <SubmissionPreview progress={0} />
                                </Box>
                            </Tab>
                            <Tab title="Completed">
                                <Box 
                                    pad={{ vertical: "25px", horizontal: "25px" }}
                                    justify="center"
                                    alignContent="center"
                                    align="center"
                                >
                                    <SubmissionPreview progress={7} />
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