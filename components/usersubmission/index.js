import { Component } from 'react'
import { Query, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Box, Text } from 'grommet'
import Card from '../card'
import InnerCard from '../card/innercard'
import Comments from '../comments'
import SubmissionComplete from './complete'

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
            proposedSolution
            resourceExplanation
            solutionMeasurement     
            progress {
                id
                name
            }
            approval {
                id
                name
            }
            supervisorapproval {
                id
                name
            }
            supervisor
            lead
            rewarded
            reward {
                id
                name
            }
            department
        }
        committee_approvals: allApprovals {
            id
            name
        }
        supervisor_approvals: allSupervisorApprovals {
            id
            name
        }
        improvement_area_types: allImprovementAreaTypes {
            id
            name
        }
    }
`

const GET_SUBMISSION_SUPERVISOR = gql`
    query supervisor($id: String!) {
    supervisor: fetchUserByOid(id: $id) {
        id
        name
        email
        secondaryEmail
    }
}
`

class UserSubmission extends Component {

    render() {
        const { currentUserOid, user, isSupervisor, supervisorQuery, isLead, isAdmin, users, id } = this.props
        const supervisorName = supervisorQuery.supervisor ? supervisorQuery.supervisor.name : '';
        const supervisorEmail = supervisorQuery.supervisor ? supervisorQuery.supervisor.email : '';

        return (
            <Query 
                query={GET_SUBMISSION_BY_ID} 
                variables={{ id }}
            >
                {({ loading, error, data }) => {
                    if (loading)  return 'Loading...'
                    if (error) return `Error! ${error.message}`
                    let isSubmissionSupervisor = false
                    let isSubmissionLead = false
                    if(data.submission.supervisor === currentUserOid) {
                        isSubmissionSupervisor = true
                    }
                    if(data.submission.lead === currentUserOid) {
                        isSubmissionLead = true
                    }
                    
                    let supervisorApprovalNotification = data.submission.supervisorapproval ? data.submission.supervisorapproval.name : ''
                    let supervisorNotificationBackground = data.submission.supervisorapproval ? data.submission.supervisorapproval.id : -1
                    let committeeApprovalNotification = data.submission.approval ? data.submission.approval.name : ''
                    let committeeNotificationBackground = data.submission.approval ? data.submission.approval.id : -1

                    return (     
                        <React.Fragment>
                            {data.submission.progress.id === 9 &&
                                <SubmissionComplete id={data.submission.id} />
                            }
                                <React.Fragment>
                                    <Card title={`Submission #${data.submission.id}`}>
                                        <Box flex={true} fill={true}>
                                            <Box direction='row' wrap={true}>
                                                <Box width='33.33%'>
                                                    <Text size='14px'><strong>Name:</strong> <a href={`mailto: ${data.submission.user.email}`}> {data.submission.user.name}</a></Text>
                                                </Box>
                                                <Box width='33.33%'>
                                                    <Text size='14px'><strong>Supervisor:</strong> <a href={`mailto: ${supervisorEmail}`} target='_blank'>{supervisorName}</a></Text>
                                                </Box>
                                                <Box width='33.33%'>
                                                    <Text size='14px'><strong>Department:</strong> {data.submission.department}</Text>
                                                </Box>
                                            </Box>
                                            <Box
                                                background='lightGray'
                                                height='1px'
                                                justify='center'
                                                align='center'
                                                direction='row'
                                                width='96%'
                                                margin={{ vertical: '25px', horizontal: 'auto' }}
                                            />
                                            <Box direction='row' wrap={true} margin={{ bottom: '15px' }}>
                                                <Box width='33.33%'>
                                                    <Text size='14px'>
                                                        <strong>Areas Affected:</strong>
                                                        <ul>
                                                            {data.submission.areas.map(area => 
                                                                <li key={area.id}>{area.name}</li>
                                                            )}
                                                        </ul>
                                                    </Text>
                                                </Box>
                                                <Box width='33.33%'>
                                                    <Text size='14px'>
                                                        <strong>Wastes Seen:</strong>
                                                        <ul>
                                                            {data.submission.wastes.map(waste => 
                                                                <li key={waste.id}>{waste.name}</li>
                                                            )}
                                                        </ul>
                                                    </Text>
                                                </Box>
                                                <Box width='33.33%'>
                                                    <Text size='14px'>
                                                        <strong>Process Improved:</strong>
                                                        <ul>
                                                            {data.submission.improvements.map(improvement => 
                                                                <li key={improvement.id}>{improvement.name}</li>
                                                            )}
                                                        </ul>
                                                    </Text>
                                                </Box>
                                                <Box width='33.33%' margin={{ top: '35px' }}>
                                                    <Text size='14px'>
                                                        <strong>Proposed Resources Needed:</strong>
                                                        <ul>
                                                            {data.submission.resources.map(resource => 
                                                                <li key={resource.id}>{resource.name}</li>
                                                            )}
                                                        </ul>
                                                    </Text>
                                                </Box>
                                            </Box>
                                            <InnerCard title='Issue Description'>{data.submission.description}</InnerCard>
                                            <InnerCard title='Proposed Solution'>{data.submission.proposedSolution}</InnerCard>
                                            {data.submission.resourceExplanation &&
                                                <InnerCard title='Why Do You Need The Requested Resources'>{data.submission.resourceExplanation}</InnerCard>
                                            }
                                            {data.submission.solutionMeasurement &&
                                                <InnerCard title='How Will This Be Measured'>{data.submission.solutionMeasurement}</InnerCard>
                                            }
                                            {data.submission.improvementExplanation &&
                                                <InnerCard title='Other Explanation'>{data.submission.improvementExplanation}</InnerCard>
                                            }
                                        </Box>
                                    </Card>
                                    {data.submission.lead &&
                                        <Comments 
                                            title='Project Lead Comments' 
                                            submissionId={data.submission.id}
                                            isLead={isLead}
                                            isSubmissionLead={isSubmissionLead}
                                            user={data.submission.user.email}
                                            commentType={3}
                                            lead={true}
                                        />
                                    }
                                    <Comments 
                                        title='Supervisor Comments'
                                        announcement={{ title: supervisorApprovalNotification, status: supervisorNotificationBackground }}
                                        supervisorApproval={data.supervisor_approvals}
                                        isSupervisor={isSupervisor}
                                        isSubmissionSupervisor={isSubmissionSupervisor}
                                        submissionId={data.submission.id}
                                        user={data.submission.user.email}
                                        commentType={2}
                                    />
                                    
                                    <Comments 
                                        title='Committee Comments'
                                        announcement={{ title: committeeApprovalNotification, status: committeeNotificationBackground}}
                                        committeeApproval={data.committee_approvals}
                                        users={users}
                                        supervisorEmail={supervisorEmail}
                                        submissionId={data.submission.id}
                                        user={data.submission.user.email}
                                        improvementAreas={data.improvement_area_types}
                                        approvalSet={data.submission.approval}
                                        isAdmin={isAdmin}
                                        commentType={1}
                                        rewarded={data.submission.rewarded}
                                    />
                                </React.Fragment>
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
}

export default compose(  
    graphql(GET_SUBMISSION_BY_ID, { 
        name: 'submissionQuery',
        option: props => ({
            variables: {
                id: props.id
            }
        })
    }),
    graphql(GET_SUBMISSION_SUPERVISOR, { 
        name: 'supervisorQuery',
        options: ownProps => ({
            variables: {
                id: ownProps.submissionQuery.submission ? ownProps.submissionQuery.submission.supervisor : ''
            }
        }) 
    }),
)(UserSubmission);