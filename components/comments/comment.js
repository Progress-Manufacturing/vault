import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { Box, Form, FormField, TextArea, Text, Button } from "grommet"

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

const Comment = (props) => {
    const [commentValue, setCommentValue] = React.useState(undefined)
    const { commentType, submissionId, title, announcement, supervisorApproval } = props
    return (
        <Mutation 
            mutation={ADD_COMMENT}
            onCompleted={() => (
                window.location.reload()
            )}
        >
            {(addComment, {data, error}) => (
                <Box>
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            addComment({ variables: {
                                content: commentValue,
                                commentType: commentType,
                                submission: submissionId
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
                        <Box pad={{ horizontal: "15px", bottom: "15px" }}>
                            <FormField 
                                label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px", marginBottom: "10px" }}>Please Add a Comment:<sup style={{ color: "red" }}>*</sup></div>}
                                htmlFor="text-area"
                                {...props}
                            >
                                <TextArea 
                                    id="text-area"
                                    placeholder="Your comments will be seen by all."
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
}

export default Comment