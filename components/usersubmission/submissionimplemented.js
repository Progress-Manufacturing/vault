import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Text } from "grommet"

const GET_LAST_SUBMISSION_COUNT = gql`
    query submissionImplemented($id: Int!){
        usercount: fetchUser (id: $id) {
            submissions {
                id
                approval {
                    id
                }
            }
	    }
    }
`

const countCompletedSubmissions = (data) => {
    let count = 0
    data.usercount.submissions.map((submission) => {
        if(submission.approval !== null) {
            if(submission.approval.id === 3 || submission.approval.id === 2) {
                count++
            }
        }
    })
    return count
}

const SubmissionsImplemented = ({id}) => (
    <Query query={GET_LAST_SUBMISSION_COUNT} variables={{ id }}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (
            <Text size="32px" margin={{ top: "10px" }}>                                
                {countCompletedSubmissions(data)}
            </Text>
        )
    }}
    </Query>
)

export default SubmissionsImplemented