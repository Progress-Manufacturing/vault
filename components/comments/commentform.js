import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { Box, Form, TextArea, Text, Button } from "grommet"

import SupervisorComment from "./supervisorcomment"
import Comment from "./comment"

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
        return (
            <Comment 
                submissionId={submissionId}
                title={title}
                commentType={commentType}
            />
        )
    }
}

export default CommentForm