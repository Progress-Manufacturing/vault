import gql from "graphql-tag";
import { Query } from "react-apollo";
import Moment from "react-moment"
import { Box, Stack, Diagram } from "grommet"
import { Compliance, Ascend } from "grommet-icons"
import Card from "../card";

const GET_SUBMISSION_PROGRESS = gql`
    query submissionProgress($id: Int!) {
        submission: fetchSubmission(id: $id) {
            id
            progress {
                id
                name
                step
            }
        }
        progress: allProgresses {
            id
            name
            step
        }
        
    }
`
const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
    fromTarget,
    toTarget,
    anchor: "horizontal",
    color: color || "yellow",
    thickness: "2px",
    ...rest
});

const SubmissionProgress = ({ id }) => (
    <Query query={GET_SUBMISSION_PROGRESS} variables={{ id }}>
        {({ loading, error, data }) => {           
            if (loading) return `Loading Submissions...`
            if (error) return `Error! ${error.message}. Please contact IT.`            
            
            const connections = []
            
            data.progress.map(progress => {
                const firstStep = String(progress.step)
                const secondStep = String(progress.step + 1)
                
                if (secondStep < 8) {
                    connections.push(
                        connection(
                            firstStep,
                            secondStep,
                            { color:  progress.step <=  data.submission.progress.step ? "brand" : "lighterBlack" }
                        )
                    )
                }
                
            })
            return (
                <Card title="Submission Status">
                    <Stack guidingChild={1} margin={{ top: "-40px", bottom: "40px", horizontal: "auto" }}>
                        <Diagram connections={connections} />
                        <Box fill={true} flex={true} align="center" justify="center">
                            <Box direction="row">
                            {data.progress.map(step =>
                                <Box key={step.id}>
                                    <Box id={step.step} margin="60px" height="10px" width="10px" overflow="visible" round background={step.step <= data.submission.progress.step ? "brand" : "lighterBlack"}>
                                        <div className="ProgressText">
                                            <ul>
                                                <li>{step.name}</li>
                                                {step.step <= data.submission.progress.step &&
                                                    <li>
                                                        <span className="ProgressTextInfo" style={{ color: "#00C781" }}>Completed</span><Compliance className="ProgressTextIcon" size="12px" color="status-ok" />
                                                        <span className="ProgressTextDate">2016-12-12 12:32</span>
                                                    </li>
                                                }
                                                {step.step === data.submission.progress.step + 1 &&
                                                    <li>
                                                        <span className="ProgressTextInfo" style={{ color: "#00873D" }}>In Progress</span><Ascend className="ProgressTextIcon" size="12px" color="neutral-1" />
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </Box>
                                </Box>
                            )}                            
                            </Box>
                        </Box>
                        <style jsx>{`
                            .ProgressText {
                                position: relative;
                                top: 15px;
                                left: -25px;
                                width: 100px;
                            }
                            .ProgressText ul {
                                margin: 0;
                                padding: 0;
                            }
                            .ProgressText ul li {
                                list-style-type: none;
                                font-size: 10px;
                                padding: 0;
                                line-height: 16px;
                                color: #343434;
                            }
                            .ProgressText ul li:first-child {
                                font-size: 12px;
                                margin-bottom: 12px;
                                color: black;
                            }
                            .ProgressText ul li span.ProgressTextInfo{
                                position: relative;
                                top: -2px;
                                margin-right: 5px;
                            }
                            .ProgressText ul li span.ProgressTextDate{
                                display: block;
                                margin-top: 5px;
                            }
                        `}</style>
                    </Stack>
                </Card>
            )
        }}
    </Query>
)

export default SubmissionProgress