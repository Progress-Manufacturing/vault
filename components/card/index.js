import React from "react"
import { Box, Text } from "grommet"

const Card = (props) => {
    const { absolute, highlight, announcement, tabs, margin, children, title } = props
    return (
        <Box flex={{ grow: 0, shrink: 0 }} margin={margin} className={absolute && "PositionRelative"}>
            <Box 
                background="white"
                elevation="xsmall"
                round="4px"
                flex={{ grow: 0, shrink: 0 }}
                overflow="hidden"
                margin={{ vertical: "10px", horizontal: "0px" }}
                className={absolute && "AbsoluteBox"}
            >
                {title &&
                    <Box
                        border={!tabs && { side: "bottom", color: "lightGray", size: "1px" }}
                        align="start"
                        direction="row"
                    >
                        <Box
                            border={highlight && { side: "bottom", color: "brand", size: "2px" }}
                            alignContent="center"
                            justify="start"
                            pad={{ vertical: "12px", horizontal: "18px" }}
                        >               
                            <Text textAlign="start" size="15px">{title}</Text>
                        </Box>
                    </Box>
                }            
                {announcement &&
                    <Box
                        background={announcement.status === 1 || announcement.status === 3 || announcement.status === 4 ? "neutral-1" : "neutral-4"}
                        pad={announcement.status === -1 ? "0" : "15px"}
                        height={announcement.status === -1 ? "0" : "auto"}
                    >
                        <Text color="white" size="14px">{announcement.title}</Text>
                    </Box>
                }
                <Box flex={true} pad={{ vertical: "15px", horizontal: `${!tabs && 15}px` }} align="start" overflow={title == "Submission Status" ? { horizontal: "scroll" } : {horizontal: "hidden"} }>
                    {children}
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