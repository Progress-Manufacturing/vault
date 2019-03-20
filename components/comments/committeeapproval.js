import gql from "graphql-tag"
import { Box, Form, Select, Button } from "grommet"
import { Mutation } from "react-apollo"

const UPDATE_COMMITTEE_APPROVAL = gql`
    mutation updateCommitteeApproval($id: Int!, $progress: Int!, $approval: Int, $lead: String) {
        updateCommitteeApproval(id: $id, progress: $progress, approval: $approval, lead: $lead) {
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
        }
    }
`

const SupervisorApproval = (props) => {
    const [value, setValue] = React.useState("")
    
    return (
        <Mutation mutation={UPDATE_SUPERVISOR_APPROVAL}>
            {(updateSupervisorApproval, {data}) => (
                <Box    
                    width="auto"
                    flex={true}
                    fill={false}
                    align="end"
                    pad={{ horizontal: "18px" }}
                >
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            updateSupervisorApproval({ variables: { 
                                id: props.submissionId,
                                progress: 3,
                                supapproval: value.id
                            } });
                        }}
                    >
                        <Select 
                            labelKey="name"
                            valueKey="id"
                            options={props.status}
                            className="suggestionDropDown"
                            value={value}
                            placeholder="Endorse of Reject"
                            alignSelf="end"
                            size="small"
                            plain={true}
                            onChange={({ option }) => setValue(option)}
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

export default SupervisorApproval