import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Text } from "grommet"

const GET_USER_SUBMISSIONS_COUNT = gql`
    query userSubmissionsCount($id: Int!){
        user: fetchUser (id: $id) {
            submissions {
                id
            }
	    }
    }
`

const UserSubmissionsCount = ({ id }) => (
    <Query query={GET_USER_SUBMISSIONS_COUNT} variables={{ id }}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return "--"
        
        return (            
            <Text size="32px" margin={{ top: "10px" }}>
                {data.user.submissions.length}
            </Text>
        )
    }}
    </Query>
)

export default UserSubmissionsCount