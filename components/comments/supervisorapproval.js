import gql from "graphql-tag"
import { Box, Form, Select, Button } from "grommet"
import { Mutation } from "react-apollo"

import Authorization from "../../lib/auth/msal-auth"
import { emailNotification } from "../../lib/auth/msal-graph"
import { supervisorReviewNotification } from "../../lib/notifications"

const UPDATE_SUPERVISOR_APPROVAL = gql`
    mutation updateSubmissionSupervisorApproval(
        $id: Int!
        $progress: Int!
        $supervisorapproval: Int
        $reward: Int
    ) {
        updateSubmissionSupervisorApproval(
            id: $id
            progress: $progress
            supervisorapproval: $supervisorapproval
            reward: $reward
        ) {
            id
            progress {
                id
                name
            }
            supervisorapproval {
                id
                name
            }
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

const SupervisorApproval = (props) => {
    const [value, setValue] = React.useState("")
    const currentProgress = value.id === 2 ? 9 : 3
    const currentReward = value.id === 2 ? 2 : null
    const userMessage = supervisorReviewNotification(props.user, props.submissionId)

    return (
        <Mutation 
            mutation={UPDATE_SUPERVISOR_APPROVAL}
            onCompleted={
                () => {
                    emailNotifications(userMessage)
                }
            }
        >
            {(updateSupervisorApproval, {data}) => (
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
                            updateSupervisorApproval({ variables: { 
                                id: props.submissionId,
                                progress: currentProgress,
                                supervisorapproval: value.id,
                                reward: currentReward
                            } });
                        }}
                    >
                        <Select 
                            labelKey="name"
                            valueKey="id"
                            options={props.status}
                            className="suggestionDropDown"
                            value={value}
                            placeholder="Endorse or Reject"
                            alignSelf="end"
                            size="small"
                            plain={true}
                            onChange={({ option }) => setValue(option)}
                        />
                        <Button type="submit" className="updateSubmissionButton" label="Submit" />
                    </Form>
                    <style jsx global>{`
                        button.updateSubmissionButton {
                            border: none;
                            font-size: 15px;
                            color: white;
                            background: #D0011B;
                            border-radius: 4px;
                            margin-left: 15px;
                            transition: background 0.3s ease-in-out;
                            will-change: background;
                        }
                        button.updateSubmissionButton:hover {
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

export default SupervisorApproval