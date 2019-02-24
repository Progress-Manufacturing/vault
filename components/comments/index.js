import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Box, Text } from "grommet"
import Card from "../card"
import InnerCard from "../card/innercard"
import { Chat } from "grommet-icons"

const GET_COMMENTS = gql`
    query resources {
        allResources {
            id
            name
        }
    }    
`

const Comments = (props) => {
    const title = props.title
    const children = props.children
    const announcement = props.announcement
    return (
        <Query query={GET_COMMENTS}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                return (                    
                    <Card title={title} announcement={announcement}>
                        <Box flex={true} fill={true}>
                            {props.title === "Project Lead Comments" &&
                                 <Box direction="row" wrap={true} margin={{ bottom: "15px" }}>
                                   <Box width="33.33%">
                                        <Text size="14px" margin={{ bottom: "15px" }}>
                                            <strong>Potential Start Date:</strong> 12/12/2019
                                        </Text>
                                        <Text size="14px">
                                            <strong>Actual Start Date:</strong> 12/12/2019
                                        </Text>                                    
                                    </Box>
                                    <Box width="33.33%">
                                        <Text size="14px" margin={{ bottom: "15px" }}>
                                            <strong>Potential End Date:</strong> 12/12/2019
                                        </Text>
                                        <Text size="14px">
                                            <strong>Actual End Date:</strong> 12/12/2019
                                        </Text>
                                    </Box>
                                    <Box width="33.33%">
                                        <Text size="14px">
                                            <strong>Resources Being Used:</strong>
                                            <ul>
                                                <li>HR</li>
                                                <li>Engineering</li>
                                                <li>IT</li>
                                            </ul>
                                        </Text>
                                    </Box>
                                    <Box
                                        background="lightGray"
                                        height="1px"
                                        justify="center"
                                        align="center"
                                        direction="row"
                                        width="96%"
                                        margin={{ vertical: "25px", horizontal: "auto" }}
                                    />
                                </Box>            
                            }
                            <Box fill={true} flex={true} align="center" alignContent="center" justify="center" pad="30px">
                                <Chat color="lighterBlack" />
                                <Text color="lighterBlack" size="14px" margin={{ top: "15px" }}>No Comments</Text>
                            </Box>
                            {/* <InnerCard title={}></InnerCard> */}
                        </Box>
                        <style jsx>{`
                            ul{
                                margin: 0;
                                padding: 0;
                            }
                            li{
                                list-style-type: none;
                                margin-top: 5px;
                            }
                        `}</style>
                    </Card>
                )
            }}
        </Query>
    )
}

export default Comments