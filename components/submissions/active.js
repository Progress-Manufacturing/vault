import gql from "graphql-tag"
import { Query } from "react-apollo"
import Preview from "../usersubmission/preview/preview"

const GET_ACTIVE_USER_SUBMISSIONS = gql`
    query fetchActiveSubmissions($userId: Int!) {
        submissions: fetchActiveSubmissions (userId: $userId) {
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
        <Query query={GET_ACTIVE_USER_SUBMISSIONS} variables={{ userId }}>
            {({ loading, error, data }) => {
                if (loading) return `Loading Submissions...`
                if (error) return `Error! ${error.message}. Please contact IT. ${data}`
                
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
                                />
                            )
                        })}
                    </React.Fragment>
                )
            }}
        </Query>
    )
}

export default ActiveSubmissions