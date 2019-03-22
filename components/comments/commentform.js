import { Mutation } from "react-apollo"

import gql from "graphql-tag"

import { Box, Form, TextArea, Text, Button } from "grommet"

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
    return (
        <Mutation 
            mutation={ADD_COMMENT}
            onCompleted={() => (
                window.location.reload()
            )}
        >
            {(addComment, {data}) => (
                <Box>
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            addComment({ variables: { 
                                content: value,
                                commentType: props.commentType,
                                submission: props.submissionId
                            } });
                        }}
                        
                    >
                        <Text margin={{ bottom: "25px" }}>Add Your Comment Below</Text>
                        <TextArea
                            placeholder="Your comments will be seen by the employee who submitted the suggestion as well as their supervisor, team lead and the committee."
                            value={value}
                            onChange={event => setValue(event.target.value)}
                        />
                        <Box
                            flex={false}
                            justify="end"
                            margin={{ top: "15px" }}
                        >
                            <Button 
                                type="submit"
                                className="updateSubmissionButton"
                                label="Submit" 
                                alignSelf="end"
                            />
                        </Box>
                        
                    </Form>
                </Box>
            )}
        </Mutation>
    )
}

export default CommentForm