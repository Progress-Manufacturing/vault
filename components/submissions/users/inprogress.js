import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Box, Text } from "grommet"
import { Clear } from "grommet-icons"
import Preview from "../../usersubmission/preview/preview"

const GET_IN_PROGRESS_USER_SUBMISSIONS = gql`
    query fetchInProgressSubmissions($userId: Int!) {
        submissions: fetchInProgressSubmissions (userId: $userId) {
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
            user {
                id
                name
            }
            department
        }
        progress: allProgresses {
            id
            name
            step
        }
    }
`

const InProgressSubmissions = (props) => {
    const userId = props.userId
    
    return (
        <Query query={GET_IN_PROGRESS_USER_SUBMISSIONS} variables={{ userId }}>
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
                                        user={submission.user.name}
                                        department={submission.department}
                                    />
                                )
                            })}
                        </React.Fragment>
                    )
                } else {
                    return (
                        <Box flex={true} pad={{ top: "50px" }} justify="center" align="center">
                            <Clear color="lighterBlack" size="40px"/>
                            <Text color="lighterBlack" margin={{ vertical: "15px" }} style={{ textAlign: "center" }}>No submissions <strong>in progress</strong> at this time</Text>        
                        </Box>
                    )
                }
            }}
        </Query>
    )
}

export default InProgressSubmissions