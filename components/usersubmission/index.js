import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Box, Text } from "grommet"
import Card from "../card"
import InnerCard from "../card/innercard"

const GET_SUBMISSION_BY_ID = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            user {
                id
                firstName
                lastName
                email
            }
            areas {
                id
                name
            }
            wastes {
                id
                name
            }
            improvements {
                id
                name
            }
            resources {
                id
                name
            }
            description
            improvementExplanation
            proposedSolution
            resourceExplanation
            solutionMeasurement        
        }
    }
`

const UserSubmission = ({ id }) => {
    return (
        <Query query={GET_SUBMISSION_BY_ID} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                return (                    
                    <Card title={`Submission #${data.submission.id}`}>
                        <Box flex={true} fill={true}>
                            <Box direction="row" wrap={true}>
                                <Box width="33.33%">
                                    <Text size="14px"><strong>Name:</strong> {data.submission.user.firstName} {data.submission.user.lastName}</Text>
                                </Box>
                                <Box width="33.33%">
                                    <Text size="14px"><strong>Employee ID:</strong> {data.submission.user.id}</Text>
                                </Box>
                                <Box width="33.33%">
                                    <Text size="14px"><strong>Supervisor:</strong> Kid Awesome</Text>
                                </Box>
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
                            <Box direction="row" wrap={true} margin={{ bottom: "15px" }}>
                                <Box width="33.33%">
                                    <Text size="14px">
                                        <strong>Areas Affected:</strong>
                                        <ul>
                                            {data.submission.areas.map(area => 
                                                <li key={area.id}>{area.name}</li>
                                            )}
                                        </ul>
                                    </Text>
                                </Box>
                                <Box width="33.33%">
                                    <Text size="14px">
                                        <strong>Wastes Seen:</strong>
                                        <ul>
                                            {data.submission.wastes.map(waste => 
                                                <li key={waste.id}>{waste.name}</li>
                                            )}
                                        </ul>
                                    </Text>
                                </Box>
                                <Box width="33.33%">
                                    <Text size="14px">
                                        <strong>Process Improved:</strong>
                                        <ul>
                                            {data.submission.improvements.map(improvement => 
                                                <li key={improvement.id}>{improvement.name}</li>
                                            )}
                                        </ul>
                                    </Text>
                                </Box>
                                <Box width="33.33%" margin={{ top: "35px" }}>
                                    <Text size="14px">
                                        <strong>Proposed Resources Needed:</strong>
                                        <ul>
                                            {data.submission.resources.map(resource => 
                                                <li key={resource.id}>{resource.name}</li>
                                            )}
                                        </ul>
                                    </Text>
                                </Box>
                            </Box>
                            <InnerCard title="Issue Description">{data.submission.description}</InnerCard>
                            <InnerCard title="Proposed Solution">{data.submission.proposedSolution}</InnerCard>
                            {data.submission.resourceExplanation &&
                                <InnerCard title="Why Do You Need The Requested Resources">{data.submission.resourceExplanation}</InnerCard>
                            }
                            {data.submission.solutionMeasurement &&
                                <InnerCard title="How Will This Be Measured">{data.submission.solutionMeasurement}</InnerCard>
                            }
                            {data.submission.improvementExplanation &&
                                <InnerCard title="Other Explanation">{data.submission.improvementExplanation}</InnerCard>
                            }
                            
                        </Box>
                        <style jsx>{`
                            ul{
                                margin: 0;
                                padding: 0;
                            }
                            li{
                                list-style-type: none;
                                margin-top: 5px;
                                font-size: 13px;
                            }
                        `}</style>
                    </Card>
                )
            }}
        </Query>
    )
}

export default UserSubmission