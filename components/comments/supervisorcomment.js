import gql from "graphql-tag"
import { Box, Form, FormField, Select, Button, Text, TextArea } from "grommet"
import { Query, Mutation } from "react-apollo"

import Authorization from "../../lib/auth/msal-auth"
import { emailNotification } from "../../lib/auth/msal-graph"
import { supervisorReviewNotification, initialAdminNotification } from "../../lib/notifications"

const ADD_SUPERVISOR_APPROVAL = gql`
    mutation addSubmissionSupervisorApproval(
        $id: Int!
        $progress: Int!
        $supervisorapproval: Int!
        $content: String!
        $commentType: Int!
        $submission: Int!
        $reward: Int
    ) {
        addSubmissionSupervisorApproval(
            id: $id
            progress: $progress
            supervisorapproval: $supervisorapproval
            content: $content
            commentType: $commentType
            submission: $submission
            reward: $reward
        ) {
            id
            progress {
                id
            }
            supervisorapproval {
                id
                name
            }
            submission {
                id
            }
            reward {
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
    const auth = new Authorization()

    try {
        const token = await auth.getToken()
        const sendNotification = await emailNotification(token, message)
        
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
    const [commentValue, setCommentValue] = React.useState("")
    const currentProgress = statusValue.id === 2 ? 9 : 3
    const currentReward = statusValue.id === 2 ? 2 : null
    const { user, submissionId, status, supervisorApproval, title } = props
    const userMessage = supervisorReviewNotification(user, submissionId)
    console.log(status)
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
                            const adminMessage = initialAdminNotification(emails, submissionId)
                            emailNotifications(userMessage)
                            emailNotifications(adminMessage)
                        }
                    }
                >
                    {(addSubmissionSupervisorApproval, {data}) => (
                        <Box>
                            <Form
                                // onSubmit={({ value }) => console.log("Submit", value)}
                                onSubmit={e => {
                                    // e.preventDefault();
                                    addSubmissionSupervisorApproval({ variables: { 
                                        id: submissionId,
                                        progress: currentProgress,
                                        supervisorapproval: statusValue.id,
                                        content: content,
                                        commentType: commentType,
                                        submission: submissionId,   
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
                                <Box 
                                    justify="start"
                                    pad={{ left: "15px" }}
                                    margin={{ bottom: "15px" }}
                                >   
                                    <Text size="14px" color="black">Endorse or Reject Improvement Suggestion:<sup style={{ color: "red" }}>*</sup></Text>
                                    <FormField                                
                                        component={Select}
                                        labelKey="name"
                                        valueKey="id"
                                        options={supervisorApproval}
                                        value={statusValue}
                                        placeholder="Endorse or Reject"
                                        alignSelf="start"
                                        size="small"
                                        plain={true}
                                        required
                                        style={{ textAlign: "left", padding: "11px 0", color: "black" }}
                                        onChange={({ option }) => setStatusValue(option)}
                                        {...props} 
                                    />
                                </Box>
                                <Box pad={{ horizontal: "15px", bottom: "15px" }}>
                                    <Text margin={{ bottom: "10px" }} size="14px" color="black">Please Add a Comment:<sup style={{ color: "red" }}>*</sup></Text>
                                    <FormField 
                                        component={TextArea}
                                        placeholder="Your comments will be seen by the employee who submitted the suggestion as well as the team lead and committee."
                                        value={commentValue}
                                        required
                                        onChange={event => setCommentValue(event.target.value)}
                                        style={{ color: "black" }}
                                    />
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