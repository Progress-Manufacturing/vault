import gql from "graphql-tag"
import { Box, Text } from "grommet"
import { Query } from "react-apollo"

const GET_LEAD_INFO = gql`
    query fetchSubmissionLeadInfo ($submission: Int!) {
        leadinfo: fetchSubmissionLeadInfo(submission: $submission) {
            id
            user {
                id
                name
            }    
            potentialStartDate
            actualStartDate
            potentialEndDate
            actualEndDate
            resources {
                id
                name
            }
        }
    }
`

const LeadInfo = (props) => {
    const submission = props.submissionId

    return (
        <Query query={GET_LEAD_INFO} variables={{ submission }}>
                {({ loading, error, data }) => {
                    if (loading)  return "Loading..."
                    if (error) return `Error! ${error.message}`
                    
                    return (                    
                        <Box direction="row" wrap={true} margin={{ bottom: "15px" }}>
                            <Box width="33.33%">
                                <Text size="14px" margin={{ bottom: "15px" }}>
                                    <strong>Potential Start Date:</strong> {data.leadinfo ? data.leadinfo.potentialStartDate : "TBD"}
                                </Text>
                                <Text size="14px">
                                    <strong>Actual Start Date:</strong> {data.leadinfo ? data.leadinfo.actualStartDate : "TBD"}
                                </Text>                                    
                            </Box>
                            <Box width="33.33%">
                                <Text size="14px" margin={{ bottom: "15px" }}>
                                    <strong>Potential End Date:</strong> {data.leadinfo ? data.leadinfo.potentialEndDate : "TBD"}
                                </Text>
                                <Text size="14px">
                                    <strong>Actual End Date:</strong> {data.leadinfo ? data.leadinfo.actualEndDate : "TBD"}
                                </Text>
                            </Box>
                            <Box width="33.33%">
                                <Text size="14px">
                                    <strong>Resources Being Used:</strong>
                                    <ul>
                                        {data.leadinfo ? data.leadinfo.resources.map((resource) => (
                                            <li key={resource.id}>{resource.name}</li>    
                                        )) : "TBD"}
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
                        </Box> 
                    )
                }
            }
        </Query>
    )
}

export default LeadInfo