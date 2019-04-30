import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { Box, Form, TextArea, Text, Button } from "grommet"

import SupervisorComment from "./supervisorcomment"

const ADD_COMMENT = gql`
    mutation addComment(
        $content: String!
        $commentType: Int!
        $submission: Int!
    ) {
        addComment(
            content: $content
            commentType: $commentType
            submission: $submission
        ) {
            user {
                id
                name
            }
            content
            commentType
            submission {
                id
            }
        }
    }

`

const CommentForm = (props) => {
    const [value, setValue] = React.useState("")
    const { commentType, submissionId, title, announcement, supervisorApproval } = props
    
    if (commentType === 1) {
        return (
            <div> <Text color="black">Admin Comment -- {announcement.status}</Text></div>
        )
    } else if (commentType === 2 && announcement.status === -1) {
        return (
            <SupervisorComment 
                submissionId={submissionId}
                title={title}
                commentType={commentType} 
                supervisorApproval={supervisorApproval}
            />
        )
    } else if (commentType === 3) {
        return (
            <div> <Text color="black">Lead Comment -- {announcement.status}</Text></div>
        )
    } else {
        return <Comment />
    }
    // return (
    //     <Mutation 
    //         mutation={ADD_COMMENT}
    //         onCompleted={() => (
    //             window.location.reload()
    //         )}
    //     >
    //         {(addComment, {data}) => (
    //             <Box>
    //                 <Form
    //                     onSubmit={e => {
    //                         e.preventDefault();
    //                         addComment({ variables: { 
    //                             content: value,
    //                             commentType: commentType,
    //                             submission: submissionId
    //                         } });
    //                     }}
    //                 >
    //                     <Box
    //                         background="white"
    //                         pad="10px"
    //                         margin={{ bottom: "15px" }}
    //                         style={{ borderBottom: "1px solid gray" }}
    //                     >
    //                         <Text>{title}</Text>
    //                     </Box>
    //                     <Box
    //                         pad={{ horizontal: "15px" }}
    //                     >

    //                         <Text margin={{ bottom: "10px" }} size="14px" color="black">Add Your Comment Below</Text>
    //                         <TextArea
    //                             placeholder="Your comments will be seen by the employee who submitted the suggestion as well as their supervisor, team lead and the committee."
    //                             value={value}
    //                             onChange={event => setValue(event.target.value)}
    //                         />
    //                     </Box>
    //                     <Box
    //                         flex={false}
    //                         justify="end"
    //                         margin={{ top: "15px" }}
    //                     >
    //                         <Button 
    //                             type="submit"
    //                             className="updateSubmissionButton"
    //                             label="Submit" 
    //                             alignSelf="end"
    //                         />
    //                     </Box>
                        
    //                 </Form>
    //             </Box>
    //         )}
    //     </Mutation>
    // )
}

export default CommentForm