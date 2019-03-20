import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Box, Text, Accordion, AccordionPanel } from "grommet"
import Card from "../card"
import InnerCard from "../card/innercard"
import Comments from "../comments"
import SubmissionComplete from "./complete"

const GET_SUBMISSION_BY_ID = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            user {
                id
                name
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
            progress {
                id
                name
            }
            lead
        }
        committee_approvals: allApprovals {
            id
            name
        }
        supervisor_approvals: allSupApprovals {
            id
            name
        }
    }
`

const UserSubmission = (props) => {
    const id = props.id
    let commApprovals = []
    let supApprovals = []
    let supervisorName = props.supervisor ? props.supervisor.displayName : ""
    let supervisorEmail = props.supervisor ? props.supervisor.userPrincipalName : ""
    
    return (
        <Query query={GET_SUBMISSION_BY_ID} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                // Set committee approvals for dropdown
                for(let value of data.committee_approvals) {
                    commApprovals.push(value)
                }
            
                // Set supervisor approvals for dropdown
                for (let value of data.supervisor_approvals) {
                    supApprovals.push(value)
                }
                
                return (     
                    <React.Fragment>
                        {data.submission.progress.id === 7 &&
                            <SubmissionComplete id={data.submission.id} />
                        }
                        {data.submission.progress.id !== 7 && 
                            <React.Fragment>
                                {data.lead &&
                                    <Comments title="Project Lead Comments" lead={true}/>
                                }
                                
                                <Comments 
                                    title="Supervisor Comments"
                                    announcement={{ title: "Approved", status: 1 }}
                                    supervisorApproval={supApprovals} 
                                    submissionId={data.submission.id}
                                />
                                
                                {props.admin &&
                                    <Comments 
                                        title="Committee Comments"
                                        announcement={{ title: "Thank You", status: 0 }}
                                        committieApproval={commApprovals}
                                    />
                                }

                                <Card title={`Submission #${data.submission.id}`}>
                                    <Box flex={true} fill={true}>
                                        <Box direction="row" wrap={true}>
                                            <Box width="33.33%">
                                                <Text size="14px"><strong>Name:</strong> <a href={`mailto: ${data.submission.user.email}`}> {data.submission.user.name}</a></Text>
                                            </Box>
                                            <Box width="33.33%">
                                                <Text size="14px"><strong>Employee ID:</strong> {data.submission.user.id}</Text>
                                            </Box>
                                            <Box width="33.33%">
                                                <Text size="14px"><strong>Supervisor:</strong> <a href={`mailto: ${supervisorEmail}`} target="_blank">{supervisorName}</a></Text>
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
                                </Card>
                            </React.Fragment>
                        }
                        <style jsx>{`
                            a {
                                color: #D0011B;
                                text-decoration: none;
                                transition: color 0.3s ease-in-out;
                                will-change: color;
                            }
                            a:hover {
                                color: black;
                            }
                            ul {
                                margin: 0;
                                padding: 0;
                            }
                            li {
                                list-style-type: none;
                                margin-top: 5px;
                                font-size: 13px;
                            }
                        `}</style>
                    </React.Fragment>
                )
            }}
        </Query>
    )
}

export default UserSubmission