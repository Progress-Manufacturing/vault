import { Query } from "react-apollo"
import gql from "graphql-tag"

import { Box, Text, Button, Layer } from "grommet"
import { Chat, Close } from "grommet-icons"

import Card from "../card"
import LeadInfo from "./leadinfo"
import CommentForm from "./commentform";

const GET_COMMENTS = gql`
    query resources {
        allResources {
            id
            name
        }
    }    
`

const Comments = (props) => {
    const children = props.children
    const [show, setShow] = React.useState();
    return (
        <Query query={GET_COMMENTS}>
            {({ loading, error, data }) => {
                if (loading)  return "Loading..."
                if (error) return `Error! ${error.message}`
                
                return (                    
                    <Card 
                        title={props.title}
                        announcement={props.announcement}
                        supervisorApproval={ props.isSupervisor ? props.supervisorApproval : null}
                        committeeApproval={props.committeeApproval}
                        submissionId={props.submissionId}
                        users={props.users}
                    >
                        <Box flex={true} fill={true}>
                            {props.lead &&
                                <LeadInfo />           
                            }
                            <Box fill={true} flex={true} align="center" alignContent="center" justify="center" pad="30px">
                                <Chat color="lighterBlack" />
                                <Text color="lighterBlack" size="14px" margin={{ top: "15px", bottom: "15px" }}>No Comments</Text>
                                {/* TODO: Only show if admin */}
                                <Button
                                    label="Add Comment"
                                    color="brand"  
                                    onClick={() => setShow(true)}
                                />
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
                                        <CommentForm/>
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
                        `}</style>
                    </Card>
                )
            }}
        </Query>
    )
}

export default Comments