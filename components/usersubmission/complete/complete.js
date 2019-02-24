import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Box, Text, Heading } from "grommet"
import { Checkmark } from "grommet-icons"
import Card from "../../card";

const GET_SUBMISSION_BY_ID = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            user {
                id
                firstName
                lastName
                email
            }    
        }
    }
`

const SubmissionComplete = ({ id }) => (
    <Query query={GET_SUBMISSION_BY_ID} variables={{ id }}>
    {({ loading, error, data }) => {
        if (loading) return "Loading..."
        if (error) return "--"
        
        return (
            <Card>
                <Box 
                    flex={true}
                    fill={true}
                    align="center"
                    justify="center" 
                >
                    <Box 
                        round="full"
                        pad="20px"
                        background="status-ok"
                        margin={{ vertical: "25px" }}
                    >
                        <Checkmark color="white" size="40px"/>
                    </Box>
                    
                    <Heading level="3" margin={{ vertical: "10px" }}>Project Complete</Heading>
                    <Text color="lighterBlack" size="16px">Date: 12/12/2018</Text>
                    <Box 
                        background="lightGray"
                        round="xxsmall" 
                        pad={{ vertical: "25px", horizontal: "100px" }}
                        margin="20px"
                    >
                        <ul className="ProjectCompleteList">
                            <li><span>Submitted By: </span>Colin Tracy</li>
                            <li><span>Project Lead: </span>Mister Ok</li>
                            <li><span>Supervisor: </span>Mister Awesome</li>
                            <li><span>Reward: </span>$20</li>
                        </ul>
                    </Box>
                </Box>
                <style jsx>{`
                    ul.ProjectCompleteList{
                        margin: 0;
                        padding: 0;
                        text-align: left;
                    }
                    ul.ProjectCompleteList li{
                        list-style-type: none;
                        margin-top: 15px;
                        color: rgba(52,52,52,0.5);
                    }
                    ul.ProjectCompleteList li span{
                        font-weight: bold;
                        width: 100px;
                        color: black;
                        display: inline-block;
                        text-align: right;
                        margin-right: 10px;
                    }
                `}</style>
            </Card>
        )
    }}
    </Query>
)

export default SubmissionComplete