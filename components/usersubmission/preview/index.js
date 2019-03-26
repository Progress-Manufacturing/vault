import gql from "graphql-tag";
import { Query } from "react-apollo";
import Preview from "./preview"

const GET_USER_SUBMISSIONS = gql`
    query userSubmissions($id: Int!) {
        user: fetchUser (id: $id) {
            id
            submissions {
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
        }
        progress: allProgresses {
            id
            name
            step
        }
        
    }
`

const SubmissionPreviewList = ({ id }) => (
    <Query query={GET_USER_SUBMISSIONS} variables={{ id }}>
        {({ loading, error, data }) => {
            if (loading) return `Loading Submissions...`
            if (error) return `Error! ${error.message}. Please contact IT. ${data}`
            
            return (
                <React.Fragment>    
                    {data.user.submissions.map((submission, index) => {
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
                            />
                        )
                    })}
                </React.Fragment>
            )
        }}
    </Query>
)

export default SubmissionPreviewList