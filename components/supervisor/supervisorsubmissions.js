import gql from "graphql-tag";
import { Query } from "react-apollo";
import SubmissionPreview from "../usersubmission/preview/preview"

const GET_SUPERVISOR_SUBMISSIONS = gql`
    query supervisorSubmissions {
        supervisorSubmissions: fetchSupervisorSubmissions {
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

const SupervisorSubmissionPreviewList = () => (
    <Query query={GET_SUPERVISOR_SUBMISSIONS}>
        {({ loading, error, data }) => {
            if (loading) return `Loading Submissions...`
            if (error) return `Error! ${error.message}. Please contact IT. ${data}`
            
            return (
                <React.Fragment>    
                    {data.supervisorSubmissions.map((submission, index) => {
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
                    })}
                </React.Fragment>
            )
        }}
    </Query>
)

export default SupervisorSubmissionPreviewList