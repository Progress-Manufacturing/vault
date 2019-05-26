import gql from 'graphql-tag';
import { Box, Form, Select, Button, FormField, TextArea, Text } from 'grommet';
import { Mutation } from 'react-apollo';

import Card from '../card';

const ADD_IMPROVEMENT_TYPE = gql`
    mutation addSubmissionImprovementAreaType(
        $submissionId: Int!
        $improvementAreaType: Int!
    ) {
        addSubmissionImprovementAreaType(
            submissionId: $submissionId
            improvementAreaType: $improvementAreaType
        ) {
            approval {
                id
                name
            }
        }
    }
`;

const ImprovementType = (props) => {
    const [areaValue, setAreaValue] = React.useState('');
    const { submissionId, types } = props;
    console.log(submissionId)
    console.log(areaValue)
    return (
        <Card>
            <Mutation 
                mutation={ADD_IMPROVEMENT_TYPE}
                onCompleted={
                    () => { window.location.reload(); }
                }
                
            >
                {(addSubmissionImprovementAreaType, {data, error}) => (
                    <Box 
                        align='center'
                        alignContent='center'
                        justify='center'
                        fill={true}
                    >
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                addSubmissionImprovementAreaType({ variables: { 
                                    submissionId: submissionId,
                                    improvementAreaType: areaValue.id
                                } });
                            }}
                        >
                            {error && <Box margin={{ left: '15px' }}><Text color='red' size='15px'>Error :( All fields are required.</Text></Box>}
                            <Box
                                justify='start'
                                pad={{ left: '15px' }}
                                margin={{ bottom: '15px' }}
                            >
                                <FormField
                                    label={<div style={{ fontSize: '14px', color: 'black', marginLeft: '-15px' }}>Choose the improvement area:<sup style={{ color: 'red' }}>*</sup></div>}
                                    htmlFor='areaSelect'
                                    {...props}
                                >
                                    <Select 
                                        id='areaSelect'
                                        labelKey='name'
                                        valueKey='id'
                                        options={types}
                                        value={areaValue}
                                        placeholder='Production or Office'
                                        alignSelf='start'
                                        size='small'
                                        plain={true}
                                        style={{ 
                                            textAlign: 'left',
                                            padding: '11px 0',
                                            color: 'black',
                                        }}
                                        onChange={({ option }) => setAreaValue(option)}
                                    />
                                </FormField>
                            </Box>
                            <Box 
                                pad={{ bottom: '15px' }}
                                justify='center'
                                fill={true}
                            >
                                <Button 
                                    type='submit'
                                    label='Submit' 
                                    primary
                                    style={{
                                        background: '#D0011B',
                                        color: 'white',
                                        margin: '0 auto'
                                    }}
                                />
                            </Box>
                        </Form>
                    </Box>
                )}
            </Mutation>
        </Card>
    )
}

export default ImprovementType