import { Component, useState } from "react"
import gql from "graphql-tag"
import { Box, Form, Text, Button, Layer, MaskedInput } from "grommet"
import { Close } from "grommet-icons"
import { Mutation } from "react-apollo"

import Resources from "../../components/options/resources"

const UPDATE_LEAD_INFO = gql`
    mutation addLeadInfo(
        $submission: Int!
        $potentialStartDate: String
        $potentialEndDate: String
        $actualStartDate: String
        $actualEndDate: String
        $resources: [Int]
    ) {
        addLeadInfo(
            submission: $submission
            potentialStartDate: $potentialStartDate
            potentialEndDate: $potentialEndDate
            actualStartDate: $actualStartDate
            actualEndDate: $actualEndDate
            resources: $resources
        ) {
            id
            createdAt
        }
    }
`

class LeadInfo extends Component {    
    state = {
        resourcesChecked: [],
        potentialStartDate: "",
        actualStartDate: "",
        potentialEndDate: "",
        actualEndDate: ""
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
    onOpen = () => this.setState({ show: true })
    onClose = () => this.setState({ show: undefined })

    onChangePotentialStartDate = event => 
        this.setState({ potentialStartDate: event.target.value })
    onChangeActualStartDate = event => 
        this.setState({ actualStartDate: event.target.value })
    onChangePotentialEndDate = event => 
        this.setState({ potentialEndDate: event.target.value })
    onChangeActualEndDate = event => 
        this.setState({ actualEndDate: event.target.value })

    render() {
        const { 
            show,
            resourcesChecked,
            potentialStartDate,
            actualStartDate,
            potentialEndDate,
            actualEndDate  
        } = this.state
        const years = ["2019", "2020", "2021", "2022"]
        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

        return (
            <Mutation mutation={UPDATE_LEAD_INFO}>
                {(addLeadInfo, {data}) => (
                    <Box    
                        width="auto"
                        flex={true}
                        fill={false}
                        align="end"
                        pad={{ top: "6px", horizontal: "18px" }}
                    >

                        <Button
                            label="Update Information"
                            className="updateSubmissionButton"
                            onClick={this.onOpen}
                        />     
                        {show && (
                            <Layer
                                onEsc={this.onClose}
                                onClickOutside={this.onClose}
                                position="bottom"
                                responsive={true}
                                full={true}
                                plain={true}
                                className="commentModal"
                            >   
                                
                                <Form
                                    className="SubmissionForm"
                                    
                                    onSubmit={e => {
                                        e.preventDefault()
                                        
                                        addLeadInfo({ variables: { 
                                            submission: this.props.submissionId,
                                            potentialStartDate: potentialStartDate === "" ? null : potentialStartDate,
                                            potentialEndDate: potentialEndDate === "" ? null : potentialEndDate,
                                            actualStartDate: actualStartDate === "" ? null : actualStartDate,
                                            actualEndDate: actualEndDate === "" ? null : actualEndDate,
                                            resources: resourcesChecked
                                        } });
                                    }}
                                >   
                                    <Box
                                        fill="horizontal"
                                        pad={{ vertical: "15px" }}
                                    >
                                        <Text margin={{ bottom: "10px" }} size="14px"><strong>What areas would be affected (select all that apply)? <sup>*</sup></strong></Text>
                                        <Resources handleClick={this.onCheckResources} checked={resourcesChecked} />
                                    </Box>
                                    <Box
                                        flex={true}
                                        direction="row"
                                        wrap={true}
                                    >
                                        <Box
                                            pad={{ vertical: "15px" }}
                                            margin={{ horizontal: "15px" }}
                                            width="45%"
                                        >
                                            <Text margin={{ bottom: "10px" }} size="14px"><strong>Potential Start Date:</strong></Text>
                                            <MaskedInput
                                                name="potentialStartDate"
                                                className="maskedInput"
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
                                                value={potentialStartDate}
                                                onChange={this.onChangePotentialStartDate}
                                            />
                                        </Box>
                                        <Box
                                            pad={{ vertical: "15px" }}
                                            margin={{ horizontal: "15px" }}
                                            width="45%"
                                        >
                                            <Text margin={{ bottom: "10px" }} size="14px"><strong>Actual Start Date:</strong></Text>
                                            <MaskedInput
                                                name="actualStartDate"
                                                className="maskedInput"
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
                                                value={actualStartDate}
                                                onChange={this.onChangeActualStartDate}
                                            />
                                        </Box>
                                        <Box
                                            pad={{ vertical: "15px" }}
                                            margin={{ horizontal: "15px" }}
                                            width="45%"
                                        >
                                            <Text margin={{ bottom: "10px" }} size="14px"><strong>Potential End Date:</strong></Text>
                                            <MaskedInput
                                                name="potentialEndDate"
                                                className="maskedInput"
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
                                                value={potentialEndDate}
                                                onChange={this.onChangePotentialEndDate}
                                            />
                                        </Box>
                                        <Box
                                            pad={{ vertical: "15px" }}
                                            margin={{ horizontal: "15px" }}
                                            width="45%"
                                        >
                                            <Text margin={{ bottom: "10px" }} size="14px"><strong>Actual End Date:</strong></Text>
                                            <MaskedInput
                                                name="actualEndDate"
                                                className="maskedInput"
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
                                                value={actualEndDate}
                                                onChange={this.onChangeActualEndDate}
                                            />
                                        </Box>
                                    </Box>
                                    <Button type="submit" className="updateSubmissionButton" label="Submit" />
                                </Form>
                                <Button 
                                    label={<Close color="brand" />}
                                    className="commentLayerClose"
                                    color="white"
                                    onClick={this.onClose} 
                                />
                            </Layer>
                        )}
                        <style jsx global>{`
                            button.updateSubmissionButton {
                                border: none;
                                font-size: 15px;
                                color: white;
                                background: #D0011B;
                                border-radius: 4px;
                                margin-left: 15px;
                                transition: background 0.3s ease-in-out;
                                will-change: background;
                            }
                            button.updateSubmissionButton:hover {
                                border: none;
                                box-shadow: none;
                                background: black;
                            }
                            .maskedInput {
                                border: solid 2px rgba(0,0,0,0.15) !important;
                            }
                        `}</style>
                    </Box>
                )}
            </Mutation>
        )
    }
}

export default LeadInfo