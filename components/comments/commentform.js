import { Query } from "react-apollo"
import gql from "graphql-tag"

import { Box, Form, TextArea, Text, Button } from "grommet"

const GET_COMMENTS = gql`
    query resources {
        allResources {
            id
            name
        }
    }    
`

const CommentForm = (props) => {
    const [value, setValue] = React.useState('');
    return (
        <Query query={GET_COMMENTS}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                return (  
                    <Box>
                        <Form>
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
                )
            }}
        </Query>
    )
}

export default CommentForm