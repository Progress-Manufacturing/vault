import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box, CheckBox } from "grommet"

const GET_WASTES = gql`
    query allWastes {
        allWastes {
            id
            name
        }
    }
`

const Wastes = (props) => (
    <Query query={GET_WASTES} >
        {({ loading, error, data }) => {
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`
            return (
                <Box
                    direction="row"
                    wrap={true}
                    pad={{ vertical: "10px"}}
                >
                    {data.allWastes.map(item =>
                        <Box
                            key={item.id}
                            direction="row"
                            fill={false}
                            flex={false}
                            width="50%"
                            margin={{ vertical: "10px", right: "0px" }}
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

export default Wastes