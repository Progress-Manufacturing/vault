import gql from "graphql-tag"
import { Box, Text, Button, Form } from "grommet"
import { Query, Mutation } from "react-apollo"

const GET_REWARD_INFO = gql`
    query submission($id: Int!) {
        submission: fetchSubmission(id: $id) {
            user {
                name
            }
            reward {
                name
            }
            progress {
                id
            }
        }
    }
`

const UPDATE_SUBMISSION_REWARDED = gql`
    mutation updateSubmission($id: Int!, $progress: Int!, $rewarded: Int) {
        updateSubmission(id: $id, progress: $progress, rewarded: $rewarded) {
            rewarded
        }
    }
`

const Reward = (props) => {
    const [rewardStatus, setRewardStatus] = React.useState(0)
    const { submissionId, title, rewarded } = props
    const id = submissionId
    
    return (
        <Query 
            query={GET_REWARD_INFO}
            variables={{ id }}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(</p>
                const submission = data.submission
                const progress = data.submission.progress.id
                
                return (
                    <Mutation
                        mutation={UPDATE_SUBMISSION_REWARDED}
                        onCompleted={() => (window.location.reload())}
                    >
                        {(updateSubmission, {data, error}) => (
                            <React.Fragment>
                                {(submission.reward && rewarded != 1)  && (
                                    <Box>
                                        <Box
                                            background="white"
                                            pad="10px"
                                            margin={{ bottom: "15px" }}
                                            style={{ borderBottom: "1px solid gray" }}
                                        >
                                            <Text>{title}</Text>
                                        </Box>
                                        <Box pad="15px">
                                            <Text color="black" style={{ fontWeight: "100" }}>Was the reward of {submission.reward.name} given to {submission.user.name}?</Text>
                                        </Box>
                                        <Form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                updateSubmission({ variables: { 
                                                    id: id,
                                                    progress: progress,
                                                    rewarded: rewardStatus
                                                } })
                                            }}
                                            style={{
                                                padding: "15px"
                                            }}
                                        >
                                            <Button 
                                                type="submit"
                                                label="Reward Given" 
                                                primary
                                                style={{
                                                    background: "#D0011B",
                                                    maxWidth: "250px",
                                                    color: "white",
                                                    margin: "0 auto 15px 0",
                                                    display: "block"
                                                }}
                                                onClick={() => setRewardStatus(1)}
                                            />
                                            <Button 
                                                type="submit"
                                                label="Reward Not Given" 
                                                primary
                                                style={{
                                                    background: "#F3DE8A",
                                                    maxWidth: "250px",
                                                    color: "black",
                                                    margin: "0 auto 15px 0",
                                                    display: "block"
                                                }}
                                                onClick={() => setRewardStatus(0)}
                                            />
                                        </Form>
                                    </Box>
                                )}
                                {(!submission.reward && rewarded != 1) && 
                                    <Box>
                                        <Box
                                            background="white"
                                            pad="10px"
                                            margin={{ bottom: "15px" }}
                                            style={{ borderBottom: "1px solid gray" }}
                                        >
                                            <Text>{title}</Text>
                                        </Box>
                                        <Text color="black" style={{ padding: "15px" }}>The reward has not been set yet. Please set the submission approval first.</Text>
                                    </Box>
                                }
                                {rewarded === 1 &&
                                    <Box>
                                         <Box
                                             background="white"
                                             pad="10px"
                                             margin={{ bottom: "15px" }}
                                             style={{ borderBottom: "1px solid gray" }}
                                         >
                                             <Text>{title}</Text>
                                         </Box>
                                         <Text color="black" style={{ padding: "15px" }}>The reward of {submission.reward.name} has already been given to {submission.user.name}.</Text>
                                     </Box>
                                }
                            </React.Fragment>        
                        )}
                    </Mutation>
                )
            }}
        </Query>
    )
}

export default Reward