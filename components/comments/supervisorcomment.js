import gql from "graphql-tag"
import { Box, Form, FormField, Select, Button, Text, TextArea } from "grommet"
import { Query, Mutation } from "react-apollo"

import Authentication from "../../lib/auth/msal-auth"
import { supervisorReviewNotification, initialAdminNotification } from "../../lib/notifications"

const ADD_SUPERVISOR_APPROVAL = gql`
    mutation addSubmissionSupervisorApproval(
        $submissionId: Int!
        $progress: Int!
        $supervisorapproval: Int!
        $content: String!
        $commentType: Int!
        $reward: Int
    ) {
        addSubmissionSupervisorApproval(
            submissionId: $submissionId
            progress: $progress
            supervisorapproval: $supervisorapproval
            content: $content
            commentType: $commentType
            reward: $reward
        ) {
            supervisorapproval {
                id
                name
            }
        }
    }
`

const GET_ADMIN_USERS = gql`
    query fetchAdminUsers{
        admins: fetchAdminUsers{
            id
            name
            email
            secondaryEmail
        }
    }
`

const emailNotifications = async (message) => {
    const graphUrl = 'https://graph.microsoft.com/v1.0';
    const auth = new Authentication();

    try {
        
        const token = await auth.getToken();
        // POST
        const sendNotification = '';
        // const sendNotification = await auth.callMSGraph(false, token, `${graphUrl}/me/sendMail`);
        
        return sendNotification
    } catch (err) {
        console.log(err)
    }
}

const message = (admins, user) => {
    const adminEmails = []
    
    for (let admin of admins) {
        adminEmails.push(admin.email)
    }
    adminEmails.push(user)
    let emailAddresses = Array.from(new Set(adminEmails));
    
    return emailAddresses
}

const SupervisorComment = (props) => {
    const [statusValue, setStatusValue] = React.useState("")
    const [commentValue, setCommentValue] = React.useState(undefined)
    const currentProgress = statusValue.id === 2 ? 9 : 3
    const currentReward = statusValue.id === 2 ? 2 : null
    const { user, submissionId, supervisorApproval, title, commentType } = props
    const userMessage = supervisorReviewNotification(user, submissionId)
    
    return (
        <Query query={GET_ADMIN_USERS}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(</p>
                const emails = message(data.admins, user)
            
                return (
                    <Mutation 
                        mutation={ADD_SUPERVISOR_APPROVAL}
                        onCompleted={
                            () => {
                                // const adminMessage = initialAdminNotification(emails, submissionId)
                                // emailNotifications(userMessage).then(() => (
                                //     emailNotifications(adminMessage)
                                // )).then(() => (
                                    window.location.reload()
                                // )).catch((err) => {
                                //         throw err
                                // })
                            }
                        }
                    >
                        {(addSubmissionSupervisorApproval, {data, error}) => (
                            <Box>
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addSubmissionSupervisorApproval({ variables: {
                                            submissionId: submissionId,
                                            progress: currentProgress,
                                            supervisorapproval: statusValue.id,
                                            content: commentValue,
                                            commentType: commentType,
                                            reward: currentReward
                                        } });
                                    }}
                                > 
                                    <Box
                                        background="white"
                                        pad="10px"
                                        margin={{ bottom: "15px" }}
                                        style={{ borderBottom: "1px solid gray" }}
                                    >
                                        <Text>{title}</Text>
                                    </Box>                               
                                    {error && <Box margin={{ left: "15px" }}><Text color="red" size="15px">Error :( All fields are required.</Text></Box>}
                                    <Box 
                                        justify="start"
                                        pad={{ left: "15px" }}
                                        margin={{ bottom: "15px" }}
                                    >   
                                        <FormField
                                            label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px" }}>Endorse or Reject Improvement Suggestion:<sup style={{ color: "red" }}>*</sup></div>}
                                            htmlFor="select"    
                                            {...props}
                                        >
                                            <Select 
                                                id="select"
                                                labelKey="name"
                                                valueKey="id"
                                                placeholder="Endorse or Reject"
                                                options={supervisorApproval}
                                                value={statusValue}
                                                alignSelf="start"
                                                size="small"
                                                plain={true}
                                                style={{ textAlign: "left", padding: "11px 0", color: "black" }}
                                                onChange={({ option }) => setStatusValue(option)}
                                            />
                                        </FormField>
                                    </Box>
                                    <Box pad={{ horizontal: "15px", bottom: "15px" }}>
                                        <FormField 
                                            label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px", marginBottom: "10px" }}>Please Add a Comment:<sup style={{ color: "red" }}>*</sup></div>}
                                            htmlFor="text-area"
                                            {...props}
                                        >
                                            <TextArea 
                                                id="text-area"
                                                placeholder="Your comments will be seen by the employee who submitted the suggestion as well as the team lead and committee."
                                                value={commentValue}
                                                onChange={event => setCommentValue(event.target.value)}
                                                style={{ color: "black" }}
                                            />
                                        </FormField>
                                    </Box>
                                    <Box pad={{ bottom: "15px" }} >
                                        <Button 
                                            type="submit"
                                            label="Submit" 
                                            primary
                                            style={{
                                                background: "#D0011B",
                                                maxWidth: "250px",
                                                color: "white",
                                                margin: "0 15px 0 auto"
                                            }}
                                        />
                                    </Box>
                                </Form>
                            </Box>
                        )}
                    </Mutation>
                )
            }}
        </Query>
    )
}

export default SupervisorComment