import React, { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import { Box, Heading, Button, Form, Text, TextArea } from "grommet"
import Link from "next/link"
import { Mutation } from "react-apollo";
import gql from "graphql-tag"

import checkLoggedIn from "../../lib/auth/checkLoggedIn"
import checkSupervisor from "../../lib/auth/checkSupervisor"
import checkLead from "../../lib/auth/checkLead"
import redirect from "../../lib/auth/redirect"

import Authorization from "../../lib/auth/msal-auth"
import { getUserSupervisor } from "../../lib/auth/msal-graph"


import Main from "../../lib/layout/main"
import Card from "../../components/card"
import Areas from "../../components/options/areas"
import Improments from "../../components/options/improvements"
import Resources from "../../components/options/resources"
import Wastes from "../../components/options/wastes"

const SUBMIT_IMPROVEMENT = gql`
  mutation addSubmission(
        $description: String!,
        $areas: [Int!]!,
        $wastes: [Int!]!,
        $improvements: [Int!]!,
        $improvementExplanation: String,
        $proposedSolution: String,
        $resources: [Int!]!,
        $resourceExplanation: String!,
        $solutionMeasurement: String!,
        $supervisor: String!
    ) {
    addSubmission(
        description: $description, 
        areas: $areas,
        wastes: $wastes,
        improvements: $improvements,
        improvementExplanation: $improvementExplanation,
        proposedSolution: $proposedSolution,
        resources: $resources,
        resourceExplanation: $resourceExplanation,
        solutionMeasurement: $solutionMeasurement,
        supervisor: $supervisor
    ) {
      id
      description
    }
  }
`

class SubmitImprovement extends Component {
    static async getInitialProps (context, apolloClient) { 
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        const { supervisorSubmissions } = await checkSupervisor(context.apolloClient)
        const { leadSubmissions } = await checkLead(context.apolloClient)
        let supervisorAuth = false
        let leadAuth = false
        
        if((supervisorSubmissions.fetchSupervisorSubmissions).length !== 0) {
          supervisorAuth = true
        }
        
        if((leadSubmissions.fetchLeadSubmissions).length !== 0) {
          leadAuth = true
        }
    
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser, supervisorSubmissions, supervisorAuth, leadSubmissions, leadAuth }
    }
    
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            areasChecked: [],
            wastesChecked: [],
            improvementsChecked: [],
            explanation: "",
            solution: "",
            resourcesChecked: [],
            resource: "",
            measure: "",
            supervisor: "No Supervisor"
        }    
    }

    async componentWillMount() {
        try {
            const supervisor = await this.getSupervisor()
            this.setState({
                supervisor: supervisor.supervisor.id
            })
        } catch (err) {
            console.log(err)
        }
    }

    async getSupervisor() {
        const auth = new Authorization()

        try {
            const token = await auth.getToken()
            const supervisor = await getUserSupervisor(token)

            return supervisor
        } catch(err) {
            console.log(err)
        }
    }

    onChangeTextArea = event => 
        this.setState({ [event.target.name]: event.target.value })
    
    onCheckAreas = (event, value) => {
        const { areasChecked } = this.state
        if (event.target.checked) {
            areasChecked.push(value)
            this.setState({ areasChecked })
        } else {
            this.setState({ areasChecked: areasChecked.filter(item => item !== value) })
        }
    }

    onCheckWastes = (event, value) => {
        const { wastesChecked } = this.state
        if (event.target.checked) {
            wastesChecked.push(value)
            this.setState({ wastesChecked })
        } else {
            this.setState({ wastesChecked: wastesChecked.filter(item => item !== value) })
        }
    }
    onCheckImprovements = (event, value) => {
        const { improvementsChecked } = this.state
        if (event.target.checked) {
            improvementsChecked.push(value)
            this.setState({ improvementsChecked })
        } else {
            this.setState({ improvementsChecked: improvementsChecked.filter(item => item !== value) })
        }
    }
    onCheckResources = (event, value) => {
        const { resourcesChecked } = this.state
        if (event.target.checked) {
            resourcesChecked.push(value)
            this.setState({ resourcesChecked })
        } else {
            this.setState({ resourcesChecked: resourcesChecked.filter(item => item !== value) })
        }
    }
      
    render() {
        const { 
            description,
            explanation,
            areasChecked,
            wastesChecked,
            improvementsChecked,
            solution,
            resourcesChecked,
            resource,
            measure,
            supervisor
        } = this.state
        return (
            <ApolloConsumer>
                {client => (
                    <Mutation mutation={SUBMIT_IMPROVEMENT}>
                        {(addSubmission, { data }) => (
                        <Main supervisor={this.props.supervisorAuth} lead={this.props.leadAuth}>
                            <Card title="Continual Improvement Submission" highlight={true}>
                                <Form 
                                    className="SubmissionForm"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addSubmission({
                                            variables: { 
                                                description: description,
                                                areas: areasChecked,
                                                wastes: wastesChecked,
                                                improvements: improvementsChecked,
                                                improvementExplanation: explanation,
                                                proposedSolution: solution,
                                                resources: resourcesChecked,
                                                resourceExplanation: resource,
                                                solutionMeasurement: measure,
                                                supervisor: supervisor
                                            } 
                                        });
                                    }}
                                >
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>Describe the issue or opportunity <sup>*</sup></strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize="vertical"
                                            placeholder="Make sure your description is clear and concise."
                                            name="description"
                                            value={description} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>What areas would be affected (select all that apply)? <sup>*</sup></strong></Text>
                                        <Areas handleClick={this.onCheckAreas} checked={areasChecked} />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>What are some of the wastes seen (select all that apply)? <sup>*</sup></strong></Text>
                                        <Wastes handleClick={this.onCheckWastes} checked={wastesChecked} />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>How will this suggestion improve the process (select all that apply)? <sup>*</sup></strong></Text>
                                        <Improments handleClick={this.onCheckImprovements} checked={improvementsChecked} />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>Explanation of how this will improve the process:</strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize="vertical"
                                            placeholder="Make sure your description is clear and concise."
                                            name="explanation"
                                            value={explanation} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box 
                                        fill="horizontal"
                                        pad={{ vertical: "10px" }}
                                        border={{ color: "black", side: "bottom", size: "1px" }}
                                    >
                                        <Heading level={4} pad="0px" margin="0px">Solution</Heading>
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>Proposed solution or improvement </strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize="vertical"
                                            placeholder="Make sure your description is clear and concise."
                                            name="solution"
                                            value={solution} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>Proposed resources needed (select all that apply): <sup>*</sup></strong></Text>
                                        <Resources handleClick={this.onCheckResources} checked={resourcesChecked} />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>Why do you need this resource involvement: </strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize="vertical"
                                            placeholder="Make sure your description is clear and concise."
                                            name="resource"
                                            value={resource} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>How will this suggestion be measured wheather or not the project or proposal was successful? </strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize="vertical"
                                            placeholder="Make sure your description is clear and concise."
                                            name="measure"
                                            value={measure} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill={false}
                                        pad={{ vertical: "15px" }}
                                        align="end"
                                    >
                                        <Button
                                            className="SimpleButton"
                                            label="Submit Improvement"
                                            type="submit"
                                            pad="20px"
                                        />
                                    </Box>
                                </Form>
                            </Card>
                            
                            {/* {data && 
                                <Card title="Thank You" highlight={true}>
                                    <p><strong>Submission #{data.addSubmission.id}</strong></p>
                                    <p style={{ fontSize: "14px" }}>
                                        Thank you! Thank you for making Progress Manufacturing a better place to work! Our team of improvement experts will review your suggestion and let you know the conclusion.<br/><br/>
                                        If it's approved we'll move forward with it and you'll be handsomely rewarded!<br/><br/>
                                        If it's not approved you will be immediately for suggesting such a foolish idea. I really hope you didn't suggest getting another candy in the breakroom. You really should have read the welcome message about how Hitler liked candy. I have pity on your soul.<br/><br/>
                                        Thanks again for participating in this wonderful program! You can see the progress of your other submissions in the side menu or you can even submit another improvement suggestion, maybe this time don't make it about candy.
                                    </p>
                                    <ul className="ButtonList">
                                        <li>
                                            <Link href="/ci/submit-improvement" passHref>
                                                <Button
                                                    className="SimpleButton"
                                                    label="Submit Another Continual Improvement"
                                                    pad="20px"
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/ci/previous-submissions" passHref>
                                                <Button
                                                    className="SimpleButtonSecondary"
                                                    label="Check Status Of A Continual Improvement"
                                                    pad="20px"
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                </Card>
                            } */}
                            <style jsx>{`
                                .SubmissionForm {
                                    width: 100%;
                                }
                                sup {
                                    color: red;
                                    font-size: 12px;
                                }
                                ul.ButtonList {
                                    margin: 15px 0;
                                    padding: 0;
                                }
                                ul.ButtonList li {
                                    list-style-type: none;
                                    display: inline-block;
                                    margin-right: 25px
                                }
                            `}</style>
                        </Main>
                        )}
                    </Mutation>
                )}
            </ApolloConsumer>
        )
    }
}
    
export default SubmitImprovement