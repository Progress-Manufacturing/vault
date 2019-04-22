import Link from "next/link"
import Moment from "react-moment"
import { Box, Text, Grid, Meter, ResponsiveContext, Button } from "grommet"
import { Notes } from "grommet-icons"

const SubmissionPreview = (props) => {
    const submissionProgressValue = props.submissionprogress / props.allprogress.length * 100
    const submissionApprovalValue = props.approval !== 1 ? (submissionProgressValue < 70 ? "status-warning" : "status-ok") : "status-error"
    const iconColor = props.index % 2 ? "black" : "brand"
    
    return (
        <ResponsiveContext.Consumer>
            {size => (
                <Box
                    key={props.id}
                    direction={size !== "small" ? "row" : "column"}
                    fill={true}
                    border={props.border && { side: "bottom", size: "1px", color: "lighterBlack" }}
                    pad={props.padding && { vertical: "25px", horizontal: "10px" }}
                    className="submissionBoxPreview"
                >   
                    <Grid
                        key={props.id}
                        fill                
                        rows={["auto", "flex"]}
                        columns={["auto", "flex"]}
                        areas={size !== "small" ? ([
                                { name: "icon", start: [0, 0], end: [0, 1] },
                                { name: "snippet", start: [1, 0], end: [1, 1] },
                                { name: "user", start: [2, 0], end: [2, 1] },
                                { name: "department", start: [3, 0], end: [3, 1] },
                                { name: "date", start: [4, 0], end: [4, 1] },
                                { name: "progress", start: [5, 0], end: [5, 1] },
                                { name: "view", start: [6, 0], end: [6, 1] }
                            ]) : ([
                                { name: "view", start: [0, 0], end: [0, 0] },
                                { name: "snippet", start: [1, 0], end: [1, 0] },
                                { name: "date", start: [0, 1], end: [0, 1] },
                                { name: "progress", start: [1, 1], end: [1, 1] },
                            ])
                        }
                    >
                        {size !== "small" &&
                            <Box 
                                gridArea="icon"
                                pad={props.padding && { horizontal: "10px" }}
                                margin={{ top: "3px" }}
                            >
                                <Box
                                    background={iconColor}
                                    pad={{ vertical: "20px", horizontal: "20px"}}
                                    align="center"
                                    round="8px"
                                >
                                    <Notes size="20px" />
                                </Box>
                            </Box>
                        }
                        <Box
                            gridArea="snippet"
                            pad={{ horizontal: "10px" }}
                        >
                            <Text size="12px" color="lighterBlack" margin={{ bottom: "5px" }}>Submission {props.id}</Text>
                            <Text size="14px" color="black">{props.description.substring(0, 40)}...</Text>
                        </Box>
                        {size !== "small" &&
                            <React.Fragment>
                                <Box 
                                    gridArea="user"
                                    pad={{ horizontal: "10px" }}
                                >
                                    <Text size="12px" color="lighterBlack" margin={{ bottom: "5px" }}>Submitted By</Text>
                                    <Text size="14px" color="black">{props.user}</Text>
                                </Box>
                                <Box 
                                    gridArea="department"
                                    pad={{ horizontal: "10px" }}
                                >
                                    <Text size="12px" color="lighterBlack" margin={{ bottom: "5px" }}>Department</Text>
                                    <Text size="14px" color="black">{props.department}</Text>
                                </Box>
                            </React.Fragment>
                        }
                        <Box
                            gridArea="date"
                            pad={{ horizontal: "10px" }}
                        >
                            <Text size="12px" color="lighterBlack" margin={size !== "small" ? { bottom: "5px" } : { top: "15px" }}>Submission Date</Text>
                            
                            <Text size="14px" color="black"><Moment format="YYYY-MM-DD HH:mm">{props.createdAt}</Moment></Text>
                        </Box>
                        <Box
                            gridArea="progress"
                            pad={{ horizontal: "10px" }}
                        >
                            <Text size="12px" color="lighterBlack" margin={size !== "small" ? { bottom: "5px" } : { top: "15px" }}>Progress</Text>
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
                            pad={size !== "small" ? { horizontal: "40px" } : { horizontal: "0" }}
                            align="center"
                            justify="center"
                            alignContent="center"
                            alignSelf="center"
                        >   
                            <Link passHref href={`${props.route}/submission?id=${props.id}`}>
                                <Button 
                                    primary 
                                    label="View"
                                    style={{ textAlign: "center", background: "black" }}
                                />
                            </Link>
                        </Box>
                        {/* as={`/previous-submissions/submission/${submission.id}`} */}
                    </Grid>
                    <style jsx global>{`
                        div.submissionBoxPreview:last-child {
                            border: none !important;
                            padding-bottom: 0 !important;
                            margin-bottom: 0 !important;
                        }
                    `}</style>
                </Box>
            )}
        </ResponsiveContext.Consumer>
    )
}

export default SubmissionPreview