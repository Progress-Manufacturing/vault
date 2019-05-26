import { Component } from 'react';
import gql from 'graphql-tag';
import { Box, Text } from 'grommet';
import { Query, compose, graphql } from 'react-apollo';

const GET_ADMIN_INFO = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            lead
            department
            improvementAreaType {
                name
            }
            reward {
                id
                name
            }
        }
    }
`;

const GET_SUBMISSION_LEAD = gql`
    query lead($id: String!) {
        lead: fetchUserByOid(id: $id) {
            name
            email
            secondaryEmail
        }
    }
`;


class AdminInfo extends Component {
    render(props) {
        const { submissionId, leadQuery } = this.props
        const id = submissionId
        const leadName = leadQuery.lead ? leadQuery.lead.name : '';
        const leadEmail = leadQuery.lead ? leadQuery.lead.email : '';
        let improvementType = <i style={{ color: 'red' }}>Please Set</i>;

        return (
            <Query 
                query={GET_ADMIN_INFO} 
                variables={{ id }}
            >
                {({ loading, error, data }) => {
                    if (loading)  return 'Loading...'
                    if (error) return `Error! ${error.message}`
                    if (data.submission.improvementAreaType != null) {
                        improvementType = data.submission.improvementAreaType.name
                    }

                    console.log(data.submission.improvementAreaType)
                    return (                    
                        <Box direction='row' wrap={true} margin={{ bottom: '15px' }}>
                            <Box width='33.33%'>
                                <Text size='14px' margin={{ bottom: '15px' }}>
                                    <strong>Lead: </strong>
                                    <a href={`mailto: ${leadEmail}`} className='leadEmail'>{leadName}</a>
                                </Text>   
                                <Text size='14px'>
                                    <strong>Reward: </strong>{data.submission.reward ? data.submission.reward.name : ''}
                                </Text>                      
                            </Box>
                            <Box width='33.33%'>
                                <Text size='14px'>
                                    <strong>Department: </strong>{data.submission.department}
                                </Text>           
                            </Box>
                            <Box width='33.33%'>
                                <Text size='14px'>
                                    <strong>Improvement Area Type: </strong>{improvementType}
                                </Text>           
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
                            <style jsx>{`
                                ul{
                                    margin: 0;
                                    padding: 0;
                                }
                                li{
                                    list-style-type: none;
                                    margin-top: 5px;
                                }
                                .leadEmail{
                                    color: #D0001B;
                                    text-decoration: none;
                                    transition: color 0.3s ease-in-out
                                }
                                .leadEmail:hover{
                                    color: black;
                                }
                            `}</style>
                        </Box> 
                    )
                }
            }
        </Query>
        )
    }
}

export default compose(  
    graphql(GET_ADMIN_INFO, { 
        name: 'adminInfoQuery',
        options: props => ({
            variables: {
                id: props.submissionId
            }
        })
    }),
    graphql(GET_SUBMISSION_LEAD, { 
        name: 'leadQuery',
        options: ownProps => ({
            variables: {
                id: ownProps.adminInfoQuery.submission ? ownProps.adminInfoQuery.submission.lead : ''
            }
        }) 
    }),
)(AdminInfo);