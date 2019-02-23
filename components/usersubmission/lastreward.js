import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Text } from "grommet"

const GET_LAST_SUBMISSION_REWARD = gql`
    query lastSubmissionReward{
        usercount: fetchUser (id: 28) {
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

const lastReward = (data) => {
    const rewardNull = data.usercount.submissions.findIndex(x => x.reward === null)
    const lastReward = data.usercount.submissions[rewardNull - 1].reward.name
    
    return lastReward
}

const LastSubmissionReward = () => (
    <Query query={GET_LAST_SUBMISSION_REWARD}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (
            <Text size="32px" margin={{ top: "10px" }}>                                
                {lastReward(data)}
            </Text>
        )
    }}
    </Query>
)

export default LastSubmissionReward