import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Text } from "grommet"

const GET_LAST_SUBMISSION_REWARD = gql`
    query lastSubmissionReward($id: Int!){
        usercount: fetchUser (id: $id) {
            submissions {
                id
                reward {
                    id
                    name
                }
            }
	    }
    }
`

// const lastReward = (data) => {
    
//     const rewardNull = data.usercount.submissions.findIndex(x => x.reward === null)
//     let lastReward
//     if(rewardNull !== 0) {
//         lastReward = data.usercount.submissions[rewardNull - 1].reward.name
//     } else {
//         lastReward = '--'
//     }
//     return lastReward
// }

const LastSubmissionReward = ({ id }) => (
    <Query query={GET_LAST_SUBMISSION_REWARD} variables={{ id }}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (
            <Text size="32px" margin={{ top: "10px" }}>                                
                $25
                {/* {lastReward(data)} */}
            </Text>
        )
    }}
    </Query>
)

export default LastSubmissionReward