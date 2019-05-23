import { Component } from 'react'
import gql from 'graphql-tag'
import { Box, Text } from 'grommet'
import { Query } from 'react-apollo'

import Authentication from '../../lib/auth/msal-auth'

const GET_ADMIN_INFO = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            improvementAreaType {
                name
            }
            lead
            department
            reward {
                id
                name
            }
        }
    }
`


class AdminInfo extends Component {
    state = { 
        leadName: '',
        leadEmail: ''
    }

    getLeadName = async (userId) => {
        const graphUrl = 'https://graph.microsoft.com/v1.0';
        const auth = new Authentication()

        try {
            const token = await auth.getToken();
            const user = await auth.callMSGraph(false, token, `${graphUrl}/users/${userId}`);
            const displayName = await user.displayName;
            const displayEmail = await user.userPrincipalName;
            
            this.setState({
                leadName: displayName,
                leadEmail: displayEmail
            })

            
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { leadName, leadEmail } = this.state
        const { submissionId } = this.props
        const id = submissionId
        return (
            <Query 
                query={GET_ADMIN_INFO} 
                variables={{ id }}
                ssr={false}
                onCompleted={data => this.getLeadName(data.submission.lead)}
            >
                {({ loading, error, data }) => {
                    if (loading)  return 'Loading...'
                    if (error) return `Error! ${error.message}`
                    
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
                                    <strong>Improvement Area Type: </strong>{data.submission.improvementAreaType ? data.submission.improvementAreaType.name : ''}
                                </Text>           
                            </Box>
                            <Box width='33.33%'>
                                <Text size='14px'>
                                    <strong>Department: </strong>{data.submission.department}
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

export default AdminInfo