import gql from "graphql-tag"
import { Box, Text } from "grommet"
import { Query } from "react-apollo"
import Moment from "react-moment"
import "moment-timezone"

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
        }
    }
`



const LeadInfo = (props) => {
    const submission = props.submissionId
    let potentialStartDate, actualStartDate, potentialEndDate, actualEndDate = undefined     
    const milliTosec = (ms) => {
        let sec = ms * .001
        return sec
    }    
    
    return (
        <Query query={GET_LEAD_INFO} variables={{ submission }}>
                {({ loading, error, data }) => {
                    if (loading)  return "Loading..."
                    if (error) return `Error! ${error.message}`
                    
                    if (data.leadinfo) {
                        potentialStartDate = data.leadinfo.potentialStartDate != null || data.leadinfo.potentialStartDate == "" ? milliTosec(data.leadinfo.potentialStartDate) : "TBD"
                        actualStartDate = data.leadinfo.actualStartDate != null || data.leadinfo.actualStartDate == "" ? milliTosec(data.leadinfo.actualStartDate) : "TBD"
                        potentialEndDate = data.leadinfo.potentialEndDate != null || data.leadinfo.potentialEndDate == "" ? milliTosec(data.leadinfo.potentialEndDate) : "TBD"
                        actualEndDate = data.leadinfo.actualEndDate != null || data.leadinfo.actualEndDate == "" ? milliTosec(data.leadinfo.actualEndDate) : "TBD"
                    }
                    return (                    
                        <Box direction="row" wrap={true} margin={{ bottom: "15px" }}>
                            <Box width="33.33%">
                                <Text size="14px" margin={{ bottom: "15px" }}>
                                    <strong>Potential Start Date: </strong>{potentialStartDate === undefined ? "TBD" : (<Moment format="YYYY-MM-DD" unix>{potentialStartDate}</Moment>)}
                                </Text>
                                <Text size="14px">
                                    <strong>Actual Start Date: </strong>{actualStartDate === undefined ? "TBD" : (<Moment format="YYYY-MM-DD" unix>{actualStartDate}</Moment>)}
                                </Text>                                    
                            </Box>
                            <Box width="33.33%">
                                <Text size="14px" margin={{ bottom: "15px" }}>
                                    <strong>Potential End Date: </strong>{potentialEndDate === undefined ? "TBD" : (<Moment format="YYYY-MM-DD" unix>{potentialEndDate}</Moment>)}
                                </Text>
                                <Text size="14px">
                                    <strong>Actual End Date: </strong>{actualEndDate === undefined ? "TBD" : (<Moment format="YYYY-MM-DD" unix>{actualEndDate}</Moment>)}
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