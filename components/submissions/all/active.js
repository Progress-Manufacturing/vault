import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Box, Text } from "grommet"
import { Clear } from "grommet-icons"
import Preview from "../../usersubmission/preview/preview"

const GET_ALL_ACTIVE_SUBMISSIONS = gql`
    query fetchActiveAllSubmissions {
        submissions: fetchActiveAllSubmissions {
            id
            description
            createdAt
            progress {
                id
                name
                step
            }
            approval {
                id
                name
            }
        }
        progress: allProgresses {
            id
            name
            step
        }
    }
`

const ActiveSubmissions = (props) => {
    const userId = props.userId
    
    return (
        <Query query={GET_ALL_ACTIVE_SUBMISSIONS} variables={{ userId }}>
            {({ loading, error, data }) => {
                if (loading) return `Loading Submissions...`
                if (error) return `Error! ${error.message}. Please contact IT. ${data}`
                if (data.submissions.length !== 0) {
                    return (
                        <React.Fragment>
                            {data.submissions.map((submission, index) => {
                                return (
                                    <Preview
                                        key={submission.id}
                                        id={submission.id}
                                        index={index}
                                        description={submission.description}
                                        createdAt={submission.createdAt}
                                        submissionprogress={submission.progress.step}
                                        approval={submission.approval !== null ? submission.approval.id : ''}
                                        allprogress={data.progress}
                                        border={true}
                                        padding={true}
                                        route={props.route}
                                    />
                                )
                            })}
                        </React.Fragment>
                    )
                } else {
                    return (
                        <Box flex={true} pad={{ top: "50px" }} justify="center" align="center">
                            <Clear color="lighterBlack" size="40px"/>
                            <Text color="lighterBlack" margin={{ vertical: "15px" }}>No <strong>active</strong> submissions at this time</Text>        
                        </Box>
                    )
                }
            }}
        </Query>
    )
}

export default ActiveSubmissions