import gql from "graphql-tag";
import { Query } from "react-apollo";
import SubmissionPreview from "./preview"

const GET_USER_SUBMISSIONS = gql`
    query userSubmissions {
        user: fetchUser (id: 28) {
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

const SubmissionPreviewList = (props) => (
    <Query query={GET_USER_SUBMISSIONS}>
        {({ loading, error, data }) => {
            if (loading) return `Loading Submissions...`
            if (error) return `Error! ${error.message}. Please contact IT.`
            
            return (
                <React.Fragment>    
                    {data.user.submissions.map((submission, index) => {
                        if (props.progress === submission.progress.id) {
                            return (
                                <SubmissionPreview
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
                        }
                        
                        if (props.progress === 0) {
                            if (submission.progress.id > 1 && submission.progress.id < 7) {
                                return (
                                    <SubmissionPreview
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
                            }
                        }
                    })}
                </React.Fragment>
            )
        }}
    </Query>
)

export default SubmissionPreviewList