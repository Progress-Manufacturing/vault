import React from "react"
import { Box, Text } from "grommet"
import SupervisorApproval from "../comments/supervisorapproval"
import CommitteeApproval from "../comments/committeeapproval"

const Card = (props) => {
    return (
        <Box flex={{ grow: 0, shrink: 0 }} margin={props.margin} className={props.absolute && "PositionRelative"}>
            <Box 
                background="white"
                elevation="xsmall"
                round="4px"
                flex={{ grow: 0, shrink: 0 }}
                overflow="hidden"
                margin={{ vertical: "10px", horizontal: "0px" }}
                className={props.absolute && "AbsoluteBox"}
            >
                {props.title &&
                    <Box
                        border={!props.tabs && { side: "bottom", color: "lightGray", size: "1px" }}
                        align="start"
                        direction="row"
                    >
                        <Box
                            border={props.highlight && { side: "bottom", color: "brand", size: "2px" }}
                            width="auto"
                            flex={true}
                            fill={true}
                            alignContent="center"
                            justify="start"
                            pad={{ vertical: "12px", horizontal: "18px" }}
                        >               
                            <Box
                                flex={true}
                                alignContent="center"
                                justify="center"
                            >
                                <Text textAlign="start" size="15px">{props.title}</Text>
                            </Box>       
                            
                        </Box>
                        {props.supervisorApproval &&
                            <SupervisorApproval status={props.supervisorApproval} submissionId={props.submissionId} />
                        }
                        {props.committeeApproval && 
                            <CommitteeApproval status={props.committeeApproval} submissionId={props.submissionId} />
                        }
                    </Box>
                }            
                {props.announcement &&
                    <Box
                        background={props.announcement.status === 1 ? "neutral-1" : "neutral-4"}
                        pad={props.announcement.status === -1 ? "0" : "15px"}
                        height={props.announcement.status === -1 ? "0" : "auto"}
                    >
                        <Text color="white" size="14px">{props.announcement.title}</Text>
                    </Box>
                }
                <Box flex={true} pad={{ vertical: "15px", horizontal: `${!props.tabs && 25}px` }} align="start">
                    {props.children}
                </Box>
                <style jsx global>{`
                    .AbsoluteBox {
                        position: absolute;
                        width: 100%;
                        box-shadow: 0 0px 9px -4px rgba(0,0,0,0.60), 0px 3px 8px -6px rgba(0,0,0,0.60);
                    }
                    .suggestionDropDown {
                        text-align: right;
                    }
                    .updateSubmissionButton {
                        border: none;
                        font-size: 15px;
                        color: white;
                        background: #D0011B;
                        border-radius: 4px;
                        margin-left: 15px;
                        transition: background 0.3s ease-in-out;
                        will-change: background;
                    }
                    .updateSubmissionButton:hover {
                        border: none;
                        box-shadow: none;
                        background: black;
                    }
                `}</style>
            </Box>
        </Box>
    )
}

export default Card