import React, { Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import { Box, Heading, Button, Form, Text, TextArea } from 'grommet';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Authorization from '../../../lib/auth/msal-auth';
import { initialUserNotification, initialSupervisorNotification } from '../../../lib/notifications';

import Main from '../../../lib/layout/main';
import Card from '../../../components/card';
import Areas from '../../../components/options/areas';
import Improvments from '../../../components/options/improvements';
import Resources from '../../../components/options/resources';
import Wastes from '../../../components/options/wastes';

const SUBMIT_IMPROVEMENT = gql`
  mutation addSubmission(
        $description: String!,
        $areas: [Int!]!,
        $wastes: [Int!]!,
        $improvements: [Int!]!,
        $proposedSolution: String,
        $resources: [Int!]!,
        $resourceExplanation: String!,
        $solutionMeasurement: String!,
        $supervisor: String!,
        $department: String!
    ) {
    addSubmission(
        description: $description, 
        areas: $areas,
        wastes: $wastes,
        improvements: $improvements,
        proposedSolution: $proposedSolution,
        resources: $resources,
        resourceExplanation: $resourceExplanation,
        solutionMeasurement: $solutionMeasurement,
        supervisor: $supervisor,
        department: $department
    ) {
      id
      description
    }
  }
`

class SubmitImprovement extends Component {    
    state = {
        description: '',
        areasChecked: [],
        wastesChecked: [],
        improvementsChecked: [],
        explanation: '',
        solution: '',
        resourcesChecked: [],
        resource: '',
        measure: ''
    }

    async emailNotifications(message) {
        const auth = new Authorization()

        try {
            const token = await auth.getToken()
            const sendNotification = await emailNotification(token, message)
            
            return sendNotification
        } catch (err) {
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
        const { isSupervisor, isLead, isAdmin, user, me, supervisor } = this.props
        const { 
            description,
            areasChecked,
            wastesChecked,
            improvementsChecked,
            solution,
            resourcesChecked,
            resource,
            measure
        } = this.state
        const userMessage = initialUserNotification(user.email);
        const superMessage = initialSupervisorNotification(supervisor.email);

        return (
            <ApolloConsumer>
                {client => (
                    <Mutation 
                        mutation={SUBMIT_IMPROVEMENT}
                        onCompleted={
                            data => {
                                this.emailNotifications(userMessage).then(() => {
                                    this.emailNotifications(superMessage).then(() => {
                                        Router.push(`/ci/submit-improvement/success?id=${data.addSubmission.id}`)
                                    })
                                })
                            }
                        }
                    >
                        {(addSubmission, { data }) => (
                        <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>                            
                            <Card title='Continual Improvement Submission' highlight={true}>
                                <Form 
                                    className='SubmissionForm'
                                    onSubmit={e => {
                                        e.preventDefault();
                                        document.getElementById('submissionButton').innerHTML = 'Submitting...'
                                        addSubmission({
                                            variables: { 
                                                description: description,
                                                areas: areasChecked,
                                                wastes: wastesChecked,
                                                improvements: improvementsChecked,
                                                proposedSolution: solution,
                                                resources: resourcesChecked,
                                                resourceExplanation: resource,
                                                solutionMeasurement: measure,
                                                supervisor: supervisor.id,
                                                department: supervisor.department
                                            } 
                                        });
                                    }}
                                >
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>Describe the issue or opportunity <sup>*</sup></strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize='vertical'
                                            placeholder='Make sure your description is clear and concise.'
                                            name='description'
                                            value={description} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>What areas would be affected (select all that apply)? <sup>*</sup></strong></Text>
                                        <Areas handleClick={this.onCheckAreas} checked={areasChecked} />
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>What are some of the wastes seen (select all that apply)? <sup>*</sup></strong></Text>
                                        <Wastes handleClick={this.onCheckWastes} checked={wastesChecked} />
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>How will this suggestion improve the process (select all that apply)? <sup>*</sup></strong></Text>
                                        <Improvments handleClick={this.onCheckImprovements} checked={improvementsChecked} />
                                    </Box>                                    
                                    <Box 
                                        fill='horizontal'
                                        pad={{ vertical: '10px' }}
                                        border={{ color: 'black', side: 'bottom', size: '1px' }}
                                    >
                                        <Heading level={4} pad='0px' margin='0px'>Solution</Heading>
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>Proposed solution or improvement </strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize='vertical'
                                            placeholder='Make sure your description is clear and concise.'
                                            name='solution'
                                            value={solution} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>Proposed resources needed (select all that apply): <sup>*</sup></strong></Text>
                                        <Resources handleClick={this.onCheckResources} checked={resourcesChecked} />
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>Why do you need this resource involvement: </strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize='vertical'
                                            placeholder='Make sure your description is clear and concise.'
                                            name='resource'
                                            value={resource} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill='horizontal'
                                        pad={{ vertical: '15px' }}
                                    >
                                        <Text margin={{ bottom: '10px' }} size='14px'><strong>How will this suggestion be measured wheather or not the project or proposal was successful? </strong></Text>
                                        <TextArea
                                            plain={false}
                                            resize='vertical'
                                            placeholder='Make sure your description is clear and concise.'
                                            name='measure'
                                            value={measure} 
                                            onChange={this.onChangeTextArea}
                                            {...this.props}
                                        />
                                    </Box>
                                    <Box
                                        fill={false}
                                        pad={{ vertical: '15px' }}
                                        align='end'
                                    >
                                        <Button
                                            primary
                                            label='Submit Improvement'
                                            type='submit'
                                            id='submissionButton'
                                            style={{ padding: '20px' }}
                                        />
                                    </Box>
                                </Form>
                            </Card>
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