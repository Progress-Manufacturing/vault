import { Component } from 'react'
import { Query } from 'react-apollo'
import Moment from 'react-moment'
import gql from 'graphql-tag'
import { Box, Text, Heading } from 'grommet'
import { Checkmark } from 'grommet-icons'
import Card from '../card'

import Authentication from '../../lib/auth/msal-auth'

const GET_SUBMISSION_BY_ID = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            user {
                id
                name
                email
            }    
            reward {
                id
                name
            }
            supervisor
            lead
            updatedAt
        }
    }
`

const GET_SUBMISSION_SUPERVISOR = gql`
    query supervisor($id: String!) {
        supervisor: fetchUserByOid(id: $id) {
            name
            email
            secondaryEmail
        }
    }
`
const GET_SUBMISSION_LEAD = gql`
    query supervisor($id: String!) {
        lead: fetchUserByOid(id: $id) {
            name
            email
            secondaryEmail
        }
    }
`

class SubmissionComplete extends Component {
    state = {
        superEmail: 'N/A',
        superName: '',
        leadEmail: '',
        leadName: 'N/A'
    }

    getUserName = async (id) => {
        const graphUrl = 'https://graph.microsoft.com/v1.0';
        const auth = new Authentication();
    
        try {
            const token = await auth.getToken();
            const subSuper = await auth.callMSGraph(false, token, `${graphUrl}/users/${id}`);

            this.setState({
                superName: subSuper.displayName,
                superEmail: subSuper.mail
            })
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        const { id } = this.props
        const { superEmail, superName, leadName, leadEmail  } = this.state
        
        return (
            <Query 
                query={GET_SUBMISSION_BY_ID} 
                variables={{ id }}
                onCompleted={
                    data => {
                        this.getUserName(data.submission.supervisor)
                        this.getUserName(data.submission.lead)
                    }
                }
            >
                {({ loading, error, data }) => {
                if (loading) return 'Loading...'
                if (error) return `${error.message}`
                
                return (
                    <Card>
                        <Box 
                            flex={true}
                            fill={true}
                            align='center'
                            justify='center' 
                        >
                            <Box 
                                round='full'
                                pad='20px'
                                background='status-ok'
                                margin={{ vertical: '25px' }}
                            >
                                <Checkmark color='white' size='40px'/>
                            </Box>
                            
                            <Heading level='3' margin={{ vertical: '10px' }}>Project Complete</Heading>
                            <Text color='lighterBlack' size='16px'>Date: <Moment format='YYYY-MM-DD'>{data.submission.updatedAt}</Moment></Text>
                            <Box 
                                background='lightGray'
                                round='xxsmall' 
                                pad={{ vertical: '25px' }}
                                margin='20px'
                                style={{ textAlign: 'center', width: '500px', maxWidth: '95%' }}
                            >
                                <ul className='ProjectCompleteList'>
                                    <li><span>Submitted By: </span><a href={`mailto: ${data.submission.user.email}`}>{data.submission.user.name}</a></li>
                                    <li><span>Project Lead: </span><a href={`mailto: ${leadEmail}`}>{leadName}</a></li>
                                    <li><span>Supervisor: </span><a href={`mailto: ${superEmail}`}>{superName}</a></li>
                                    {/* <li><span>Reward: </span>{data.submission.reward ? data.submision.reward.name : ''}</li> */}
                                </ul>
                            </Box>
                        </Box>
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
                            ul.ProjectCompleteList {
                                display: block;
                                margin: 0 auto;
                                padding: 0;
                                text-align: left;
                            }
                            ul.ProjectCompleteList li {
                                list-style-type: none;
                                margin: 15px auto 0;
                                color: rgba(52,52,52,0.5);
                                text-align: center;
                            }
                            ul.ProjectCompleteList li span{
                                font-weight: bold;
                                width: 100%;
                                color: black;
                                display: block;
                                text-align: center;
                                margin-right: 10px;
                            }
                        `}</style>
                    </Card>
                )
            }}
            </Query>
        )
    }
}

export default SubmissionComplete


// export default compose(  
//     graphql(GET_SUBMISSION_BY_ID, { 
//         name: 'submissionQuery',
//         option: props => ({
//             variables: {
//                 id: props.id
//             }
//         })
//     }),
//     graphql(GET_SUBMISSION_SUPERVISOR, { 
//         name: 'supervisorQuery',
//         options: ownProps => 
//         // ({
//         //     variables: {
//         //         id: ownProps.currentUserOid
//         //     }
//         // }) 
//     }),
//     graphql(GET_LEAD_SUPERVISOR, { 
//         name: 'leadQuery',
//         options: ownProps => ({
//             variables: {
//                 id: ownProps.currentUserOid
//             }
//         }) 
//     }),
// )(SubmissionComplete);