import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box, CheckBox } from "grommet"

const GET_IMPROVEMENTS = gql`
    query allImprovements {
        allImprovements {
            id
            name
        }
    }
`

const Improvements = (props) => (
    <Query query={GET_IMPROVEMENTS} >
        {({ loading, error, data }) => {
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`
            return (
                <Box
                    direction="row"
                    wrap={true}
                    pad={{ vertical: "10px", horizontal: "25px" }}
                >
                    {data.allImprovements.map(item =>
                        <Box
                            key={item.id}
                            direction="row"
                            fill={false}
                            flex={false}
                            width="50%"
                            margin={{ vertical: "5px" }}
                        >
                            <CheckBox
                                key={item.id}
                                checked={props.checked.indexOf(item.id) !== -1}
                                label={item.name}
                                value={item.id}
                                onChange={e => props.handleClick(e, item.id)}
                            />                                
                        </Box>
                    )}
                </Box>
            )
        }}
    </Query>
)

export default Improvements