import { Query } from "react-apollo"
import gql from "graphql-tag"

import { Box, Text } from "grommet"
import { Chat } from "grommet-icons"

import Card from "../card"
import InnerCard from "../card/innercard"
import LeadInfo from "./leadinfo"

const GET_COMMENTS = gql`
    query resources {
        allResources {
            id
            name
        }
    }    
`

const Comments = (props) => {
    const children = props.children
    
    return (
        <Query query={GET_COMMENTS}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                return (                    
                    <Card 
                        title={props.title}
                        announcement={props.announcement}
                        supervisorApproval={ props.isSupervisor ? props.supervisorApproval : null}
                        committeeApproval={props.committeeApproval}
                        submissionId={props.submissionId}
                        users={props.users}
                    >
                        
                        <Box flex={true} fill={true}>
                            {props.lead &&
                                <LeadInfo />           
                            }
                            <Box fill={true} flex={true} align="center" alignContent="center" justify="center" pad="30px">
                                <Chat color="lighterBlack" />
                                <Text color="lighterBlack" size="14px" margin={{ top: "15px", bottom: "15px" }}>No Comments</Text>
                                <Text color="brand" size="16px">Add Comment</Text>
                            </Box>
                            {/* <InnerCard title={}></InnerCard> */}
                        </Box>
                    </Card>
                )
            }}
        </Query>
    )
}

export default Comments