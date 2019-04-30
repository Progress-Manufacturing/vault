import { Query } from "react-apollo"
import gql from "graphql-tag"

import { Box, Text, Button, Layer } from "grommet"
import { Chat, Close } from "grommet-icons"

import Card from "../card"
import LeadInfo from "./leadinfo"
import CommentForm from "./commentform"
import InnerCard from "../card/innercard"

const GET_COMMENTS = gql`
    query fetchCommentsBySubmission($submission: Int!, $commentType: Int!) {
        comment: fetchCommentsBySubmission(
            submission: $submission
            commentType: $commentType
        ) {
            id
            content
            user {
                id
                name
            }
            commentType
        }
    }
`

const Comments = (props) => {
    const [show, setShow] = React.useState("")
    const { 
        commentType,
        submissionId,
        announcement,
        isSupervisor,
        isAdmin,
        isLead,
        isSubmissionLead,
        isSubmissionSupervisor,
        supervisorApproval,
        superEmail,
        committeeApproval,
        leadInfoupdates,
        user,
        users,
        lead,
        title
    } = props
    const submission = submissionId
    
    return (
        <Query query={GET_COMMENTS} variables={{ submission, commentType }}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                return (                    
                    <Card 
                        title={title}
                        announcement={announcement}
                        supervisorApproval={ isSupervisor ? supervisorApproval : null}
                        superEmail={superEmail}
                        isSupervisor={isSupervisor}
                        isAdmin={isAdmin}
                        isLead={isLead}
                        isSubmissionLead={isSubmissionLead}
                        isSubmissionSupervisor={isSubmissionSupervisor}
                        committeeApproval={committeeApproval}
                        leadInfoUpdates={leadInfoupdates}
                        submissionId={submission}
                        user={user}
                        users={users}
                    >
                        <Box flex={true} fill={true}>
                            {lead &&
                                <LeadInfo submissionId={submission} />           
                            }
                            <Box fill={true} flex={true}>
                                
                                {data.comment.length === 0 &&
                                    <Box align="center" pad={{ top: "20px" }}>
                                        <Chat color="lighterBlack" />
                                        <Text color="lighterBlack" size="14px" margin={{ top: "15px", bottom: "15px" }}>No Comments</Text>
                                    </Box>    
                                }
                                
                                {data.comment.map(({ id, content, user }) => (
                                    <InnerCard key={id} title={user.name}>
                                            {content}
                                    </InnerCard>
                                ))}
                                
                                {(isSubmissionLead || isSubmissionSupervisor || isAdmin) && 
                                    <Button
                                        label={isSubmissionSupervisor == true && announcement.status != -1 ? "Add Comment" : "Update Status"}
                                        className="commentButton"
                                        alignSelf="end"
                                        style={{ 
                                            background: "#D0011B",
                                            borderRadius: "4px 0 0 0",
                                            border: "none",
                                            boxShadow: "none",
                                            color: "white",
                                            maxWidth: "250px",
                                            fontSize: "14px",
                                            position: "relative",
                                            top: "15px",
                                            right: "-15px"
                                        }}
                                        onClick={() => setShow(true)}
                                    />     
                                }

                                {show && (
                                    <Layer
                                        onEsc={() => setShow(false)}
                                        onClickOutside={() => setShow(false)}
                                        position="center"
                                        responsive={true}
                                        full={false}
                                        plain={false}
                                        className="commentModal"
                                        style={{ 
                                            backgroundColor: "white",
                                            padding: "0",
                                            borderRadius: "4px",
                                            overflow: "hidden",
                                            width: "800px",
                                            maxWidth: "100%"
                                        }}
                                    >   
                                        <CommentForm
                                            submissionId={submission}
                                            commentType={commentType}
                                            isSubmissionSupervisor={isSubmissionSupervisor}
                                            supervisorApproval={supervisorApproval}
                                            announcement={announcement}
                                            title={title}
                                            show={true}
                                        />
                                        <Button 
                                            label={<Close color="brand" />}
                                            style={{ 
                                                position: "absolute",
                                                top: "6px",
                                                right: "-10px",
                                                border: "none",
                                                boxShadow: "none"
                                            }}
                                            className="closeModal"
                                            color="white"
                                            onClick={() => setShow(false)} 
                                        />
                                    </Layer>
                                )}
                            </Box>
                        </Box>
                    </Card>
                )
            }}
        </Query>
    )
}

export default Comments