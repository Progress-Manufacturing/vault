import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Box, CheckBox } from "grommet"

const GET_RESROUCES = gql`
    query allResources {
        allResources {
            id
            name
        }
    }
`

const Resources = (props) => (
    <Query query={GET_RESROUCES} >
        {({ loading, error, data }) => {
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`
            return (
                <Box
                    direction="row"
                    wrap={true}
                    pad={{ vertical: "10px" }}
                >
                    {data.allResources.map(item =>
                        <Box
                            key={item.id}
                            direction="row"
                            fill={false}
                            flex={false}
                            width="50%"
                            margin={{ vertical: "10px", right: "0px" }}
                        >
                            <CheckBox
                                className="universalCheckBox"
                                key={item.id}
                                checked={props.checked.indexOf(item.id) !== -1}
                                label={item.name}
                                value={item.id}
                                onChange={e => props.handleClick(e, item.id)}
                            />                                
                        </Box>
                    )}
                    <style jsx global>{`
                        .universalCheckBox ~ div{
                            border: solid 2px rgba(0,0,0,0.15) !important;
                        }
                        .universalCheckBox ~ div > svg{
                            stroke: #D0011B !important;
                        }
                    `}</style>
                </Box>
            )
        }}
    </Query>
)

export default Resources