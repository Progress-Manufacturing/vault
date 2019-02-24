import Link from "next/link"
import Moment from "react-moment"
import { Box, Text, Grid, Meter } from "grommet"
import { Notes } from "grommet-icons"

const SubmissionPreview = (props) => {
    const submissionProgressValue = props.submissionprogress / props.allprogress.length * 100
    const submissionApprovalValue = props.approval !== 1 ? (submissionProgressValue < 70 ? "status-warning" : "status-ok") : "status-error"
    const iconColor = props.index % 2 ? "black" : "brand"
    return (
        <Box
            key={props.id}
            direction="row"
            fill={true}
            border={props.border && { side: "bottom", size: "1px", color: "lighterBlack" }}
            pad={props.padding && { vertical: "25px" }}
        >   
            <Grid
                key={props.id}
                fill                
                rows={["auto", "flex"]}
                columns={["auto", "flex"]}
                areas={[
                    { name: "icon", start: [0, 0], end: [0, 1] },
                    { name: "snippet", start: [1, 0], end: [1, 1] },
                    { name: "date", start: [2, 0], end: [2, 1] },
                    { name: "progress", start: [3, 0], end: [3, 1] },
                    { name: "view", start: [4, 0], end: [4, 1] }
                ]}
            >
                <Box 
                    gridArea="icon"
                    pad={props.padding && { horizontal: "10px" }}
                    margin={{ top: "3px" }}
                >
                    <Box
                        background={iconColor}
                        pad={{ vertical: "20px", horizontal: "20px"}}
                        round="8px"
                    >
                        <Notes size="20px" />
                    </Box>
                </Box>
                <Box
                    gridArea="snippet"
                    pad={{ horizontal: "10px" }}
                >
                    <Text size="12px" color="lighterBlack" margin={{ bottom: "5px" }}>Submission {props.id}</Text>
                    <Text size="14px" color="black">{props.description.substring(0, 87)}...</Text>
                </Box>
                <Box
                    gridArea="date"
                    pad={{ horizontal: "10px" }}
                >
                    <Text size="12px" color="lighterBlack" margin={{ bottom: "5px" }}>Submission Date</Text>
                    
                    <Text size="14px" color="black"><Moment format="YYYY-MM-DD HH:mm">{props.createdAt}</Moment></Text>
                </Box>
                <Box
                    gridArea="progress"
                    pad={{ horizontal: "10px" }}
                >
                    <Text size="12px" color="lighterBlack" margin={{ bottom: "5px" }}>Progress</Text>
                    <Meter
                        values={[{
                            value: submissionProgressValue,
                            color: submissionApprovalValue,
                            onClick: () => {}
                        }]}
                        round={true}
                        size="small"
                        margin={{ top: "8px" }}
                        thickness="8px"
                        aria-label="progress"
                    ></Meter>
                </Box>
                <Box
                    gridArea="view"
                    pad={{ horizontal: "10px" }}
                    align="center"
                    margin={{ top: "14px" }}
                >   
                    <Link href={`/ci/previous-submissions/submission?id=${props.id}`}>
                    {/* as={`/previous-submissions/submission/${submission.id}`} */}
                        <a className="PreviewButton">View</a>
                    </Link>
                </Box>
            </Grid>
            <style jsx>{`
                .PreviewButton {
                    background: black;
                    color: white;
                    border-radius: 8px;
                    text-decoration: none;
                    text-transform: uppercase;
                    padding: 10px 35px;
                    transition: background 0.3s ease-in-out;
                    text-align: center;
                }
                
                .PreviewButton:hover {
                    box-shadow: none;
                    background: #D0011B;
                }
            `}</style>
        </Box>
    )
}

export default SubmissionPreview