import gql from "graphql-tag"
import { Box, Form, Select, Button } from "grommet"
import { Mutation } from "react-apollo"

import Authorization from "../../lib/auth/msal-auth"
import { emailNotification } from "../../lib/auth/msal-graph"
import { 
    committeeReviewNotificationToUser,
    committeeReviewNotificationToSupervisor,
    committeeReviewNotificationToLead
} from "../../lib/notifications"

const UPDATE_COMMITTEE_APPROVAL = gql`
    mutation updateSubmissionCommitteeApproval(
        $id: Int!
        $progress: Int!
        $approval: Int
        $lead: String
        $reward: Int
    ) {
        updateSubmissionCommitteeApproval(
            id: $id
            progress: $progress
            approval: $approval
            lead: $lead
            reward: $reward
        ) {
            id
            progress {
                id
                name
            }
            approval {
                id
                name
            }
            lead
            reward {
                id
                name
            }
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

const CommitteeApproval = (props) => {
    const [approvalValue, setApprovalValue] = React.useState("")
    const [leadValue, setLeadValue] = React.useState("")
    const currentReward = approvalValue.id === 2 ? 2 : 4
    const userMessage = committeeReviewNotificationToUser(props.user, props.submissionId)
    const supervisorMessage = committeeReviewNotificationToSupervisor(props.superEmail, props.submissionId)
    // const leadMessage = committeeReviewNotificationToLead(leadEmail)
    let currentProgress    
    
    if (approvalValue.id === 2) {
        currentProgress = 9
    } else if (leadValue != null) {
        if (currentReward === 4) {
            currentProgress = 7
        } else {
            currentProgress = 6
        }
    } else {
        currentProgress = 5
    }
    
    return (
        <Mutation 
            mutation={UPDATE_COMMITTEE_APPROVAL}
            onCompleted={
                () => {
                    emailNotifications(userMessage)
                    emailNotification(supervisorMessage)
                    // emailNotification(leadMessage)
                }
            }
            
        >
            {(updateCommitteeApproval, {data}) => (
                <Box    
                    width="auto"
                    flex={true}
                    fill={false}
                    align="end"
                    pad={{ top: "3px", horizontal: "18px" }}
                >
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            updateCommitteeApproval({ variables: { 
                                id: props.submissionId,
                                progress: currentProgress,
                                approval: approvalValue.id,
                                lead: leadValue ? leadValue.id : null,
                                reward: currentReward
                            } });
                        }}
                    >
                        <Select 
                            labelKey="displayName"
                            valueKey="id"
                            options={props.users}
                            className="suggestionDropDown"
                            value={leadValue}
                            placeholder="Choose Lead"
                            alignSelf="end"
                            size="small"
                            plain={true}
                            onChange={({ option }) => setLeadValue(option)}
                        />
                        
                        <Select 
                            labelKey="name"
                            valueKey="id"
                            options={props.status}
                            className="suggestionDropDown"
                            value={approvalValue}
                            placeholder="Approve or Deny"
                            alignSelf="end"
                            size="small"
                            plain={true}
                            onChange={({ option }) => setApprovalValue(option)}
                        />
                        <Button type="submit" className="updateSubmissionButton" label="Submit" />
                    </Form>
                    <style jsx global>{`
                        .updateSubmissionButton {
                            border: none;
                            font-size: 15px;
                            color: white;
                            background: #D0011B;
                            border-radius: 4px;
                            margin-left: 15px;
                            transition: background 0.3s ease-in-out;
                            will-change: background;
                        }
                        .updateSubmissionButton:hover {
                            border: none;
                            box-shadow: none;
                            background: black;
                        }
                    `}</style>
                </Box>
            )}
        </Mutation>
    )
}

export default CommitteeApproval