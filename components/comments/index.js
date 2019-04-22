import { Query } from "react-apollo"
import gql from "graphql-tag"

import { Box, Text, Button, Layer } from "grommet"
import { Chat, Close, BlockQuote } from "grommet-icons"

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
    const commentType = props.commentType
    const submission = props.submissionId
    
    return (
        <Query query={GET_COMMENTS} variables={{ submission, commentType }}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                return (                    
                    <Card 
                        title={props.title}
                        announcement={props.announcement}
                        supervisorApproval={ props.isSupervisor ? props.supervisorApproval : null}
                        isSupervisor={props.isSupervisor}
                        isAdmin={props.isAdmin}
                        isLead={props.isLead}
                        isSubmissionLead={props.isSubmissionLead}
                        isSubmissionSupervisor={props.isSubmissionSupervisor}
                        committeeApproval={props.committeeApproval}
                        leadInfoUpdates={props.leadInfoupdates}
                        submissionId={submission}
                        user={props.user}
                        users={props.users}
                    >
                        <Box flex={true} fill={true}>
                            {props.lead &&
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

                                {props.isSubmissionLead && 
                                    <Button
                                        icon={<BlockQuote color="brand" margin={{ left: "-15px" }} size="16px" />}
                                        label="Add Comment"
                                        className="commentButton"
                                        alignSelf="end"
                                        onClick={() => setShow(true)}
                                    />     
                                }
                                
                                {props.isSubmissionSupervisor && 
                                    <Button
                                        icon={<BlockQuote color="brand" margin={{ left: "-15px" }} size="16px" />}
                                        label="Add Comment"
                                        className="commentButton"
                                        alignSelf="end"
                                        onClick={() => setShow(true)}
                                    />                          
                                }
                                
                                {props.isAdmin && 
                                    <Button
                                        icon={<BlockQuote color="brand" margin={{ left: "-15px" }} size="16px" />}
                                        label="Add Comment"
                                        className="commentButton"
                                        alignSelf="end"
                                        onClick={() => setShow(true)}
                                    />     
                                }
                                {show && (
                                    <Layer
                                        onEsc={() => setShow(false)}
                                        onClickOutside={() => setShow(false)}
                                        position="bottom"
                                        responsive={true}
                                        full={true}
                                        plain={true}
                                        className="commentModal"
                                    >   
                                        <CommentForm submissionId={submission} commentType={props.commentType} show={true} />
                                        <Button 
                                            label={<Close color="brand" />}
                                            className="commentLayerClose"
                                            color="white"
                                            onClick={() => setShow(false)} 
                                        />
                                    </Layer>
                                )}
                            </Box>
                        </Box>
                        <style jsx global>{`
                            .commentModal {
                                background: white;
                                padding: 50px;
                            }
                            .commentLayerClose {
                                position: absolute;
                                top: 15px;
                                right: 15px;
                            }
                            button.commentButton {
                                border: none;
                                box-shadow: none;
                                color: black;
                                max-width: 200px;
                                font-size: 14px;
                                position: relative;
                                top: 10px;
                                right: -20px;
                            }
                            button.commentButton:hover {
                                color: blue
                                box-shadow: none;
                            }
                        `}</style>
                    </Card>
                )
            }}
        </Query>
    )
}

export default Comments