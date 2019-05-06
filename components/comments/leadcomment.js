import gql from "graphql-tag"
import { Box, Form, Text, Button, MaskedInput, FormField, TextArea } from "grommet"
import { Query, Mutation } from "react-apollo"

const GET_LEAD_INFO = gql`
    query fetchSubmissionLeadInfo($submission: Int!) {
        fetchSubmissionLeadInfo(submission: $submission) {
            user {
                name
            }
            potentialStartDate
            potentialEndDate
            actualStartDate
            actualEndDate
        }
    }
`

const UPDATE_LEAD_INFO = gql`
    mutation addLeadInfo(
        $submission: Int!
        $potentialStartDate: String
        $potentialEndDate: String
        $actualStartDate: String
        $actualEndDate: String
        $commentType: Int!
        $content: String
    ) {
        addLeadInfo(
            submission: $submission
            potentialStartDate: $potentialStartDate
            potentialEndDate: $potentialEndDate
            actualStartDate: $actualStartDate
            actualEndDate: $actualEndDate
            commentType: $commentType
            content: $content
        ) {
            id
            createdAt
        }
    }
`

const LeadComment = (props) => {
    const [potentialStartStatus, setPotentialStartStatus] = React.useState(undefined)
    const [potentialEndStatus, setPotentialEndStatus] = React.useState(undefined)
    const [actualStartStatus, setActualStartStatus] = React.useState(undefined)
    const [actualEndStatus, setActualEndStatus] = React.useState(undefined)
    const [commentValue, setCommentValue] = React.useState(undefined)
    const { submissionId, commentType, title } = props
    
    const submission = submissionId
    const years = ["2019", "2020", "2021", "2022"]
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

    return (
        <Query 
            query={GET_LEAD_INFO}
            variables={{ submission }}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(</p>

                return (
                    <Mutation
                        mutation={UPDATE_LEAD_INFO}
                        onCompleted={() => (window.location.reload())}
                    >
                        {(addLeadInfo, {data, error}) => (
                            <Box>
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addLeadInfo({ variables: {
                                            submission: submission,
                                            potentialStartDate: potentialStartStatus,
                                            potentialEndDate: potentialEndStatus,
                                            actualStartDate: actualStartStatus,
                                            actualEndDate: actualEndStatus,
                                            commentType: commentType,
                                            content: commentValue
                                        } })
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
                                    <Box 
                                        justify="start"
                                        pad={{ horizontal: "15px" }}
                                        margin={{ bottom: "15px" }}
                                    >   
                                        <Box
                                            flex={true}
                                            fill={true}
                                            direction="row"
                                        >
                                            <FormField
                                                label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px" }}>Potential Start Date:<sup style={{ color: "red" }}>*</sup></div>}
                                                htmlFor="potentialStartDate"
                                                style={{
                                                    width: "45%",
                                                    marginRight: "15px"
                                                }}
                                                {...props}
                                            >
                                                <MaskedInput
                                                    id="potentialStartDate"
                                                    name="potentialStartDate"
                                                    mask={[
                                                        {
                                                            length: [4],
                                                            options: years,
                                                            regexp: /^1[1-2]$|^[0-9]$/,
                                                            placeholder: "YYYY"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: months,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "mm"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: days,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "dd"
                                                        }
                                                    ]}
                                                    value={potentialStartStatus}
                                                    style={{
                                                        border: "solid 1px rgba(0,0,0,0.15)",
                                                        color: "black"
                                                    }}
                                                    onChange={(e) => setPotentialStartStatus(e.target.value)}
                                                />
                                            </FormField>
                                            <FormField
                                                label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px" }}>Potential End Date:<sup style={{ color: "red" }}>*</sup></div>}
                                                htmlFor="potentialEndDate"
                                                style={{
                                                    width: "45%"
                                                }}
                                                {...props}
                                            >
                                                <MaskedInput
                                                    id="potentialEndDate"
                                                    name="potentialEndDate"
                                                    mask={[
                                                        {
                                                            length: [4],
                                                            options: years,
                                                            regexp: /^1[1-2]$|^[0-9]$/,
                                                            placeholder: "YYYY"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: months,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "mm"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: days,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "dd"
                                                        }
                                                    ]}
                                                    value={potentialEndStatus}
                                                    style={{
                                                        border: "solid 1px rgba(0,0,0,0.15)",
                                                        color: "black"
                                                    }}
                                                    onChange={(e) => setPotentialEndStatus(e.target.value)}
                                                />
                                            </FormField>
                                        </Box>
                                        <Box
                                            flex={true}
                                            fill={true}
                                            direction="row"
                                        >
                                            <FormField
                                                label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px" }}>Actual Start Date:</div>}
                                                htmlFor="actualStartDate"
                                                style={{
                                                    width: "45%",
                                                    marginRight: "15px"
                                                }}
                                                {...props}
                                            >
                                                <MaskedInput
                                                    id="actualStartDate"
                                                    name="actualStartDate"
                                                    mask={[
                                                        {
                                                            length: [4],
                                                            options: years,
                                                            regexp: /^1[1-2]$|^[0-9]$/,
                                                            placeholder: "YYYY"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: months,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "mm"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: days,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "dd"
                                                        }
                                                    ]}
                                                    value={actualStartStatus}
                                                    style={{
                                                        border: "solid 1px rgba(0,0,0,0.15)",
                                                        color: "black"
                                                    }}
                                                    onChange={(e) => setActualStartStatus(e.target.value)}
                                                />
                                            </FormField>
                                            <FormField
                                                label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px" }}>Actual End Date:</div>}
                                                htmlFor="actualEndDate"
                                                style={{
                                                    width: "45%"
                                                }}
                                                {...props}
                                            >
                                                <MaskedInput
                                                    id="actualEndDate"
                                                    name="actualEndDate"
                                                    mask={[
                                                        {
                                                            length: [4],
                                                            options: years,
                                                            regexp: /^1[1-2]$|^[0-9]$/,
                                                            placeholder: "YYYY"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: months,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "mm"
                                                        },
                                                        { fixed: "-" },
                                                        {
                                                            length: 2,
                                                            options: days,
                                                            regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                            placeholder: "dd"
                                                        }
                                                    ]}
                                                    value={actualEndStatus}
                                                    style={{
                                                        border: "solid 1px rgba(0,0,0,0.15)",
                                                        color: "black"
                                                    }}
                                                    onChange={(e) => setActualEndStatus(e.target.value)}
                                                />
                                            </FormField>
                                        </Box>
                                        <Box
                                            flex={true}
                                            fill={true}
                                            direction="row"
                                        >
                                            <FormField 
                                                label={<div style={{ fontSize: "14px", color: "black", marginLeft: "-15px", marginBottom: "10px" }}>Please Add a Comment:<sup style={{ color: "red" }}>*</sup></div>}
                                                htmlFor="text-area"
                                                style={{ width: "100%" }}
                                                {...props}
                                            >
                                                <TextArea 
                                                    id="text-area"
                                                    placeholder="Your comments will be seen by the employee who submitted the suggestion as well as the supervisor and committee."
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
                                    </Box>
                                </Form>
                            </Box>
                        )}
                    </Mutation>
                )
            }}
        </Query>
    )
}


export default LeadComment