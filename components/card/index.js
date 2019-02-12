import { Box, Text } from 'grommet'

const Card = (props) => (
    
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
                >
                    <Box    
                        border={props.highlight && { side: "bottom", color: "brand", size: "2px" }}
                        width="auto"
                        flex={false}
                        fill={false}
                        align="start"
                        pad={{ vertical: "10px", horizontal: "18px" }}
                    >
                        <Text textAlign="start" size="15px">{props.title}</Text>
                    </Box>
                
                </Box>
            }            
            {props.announcement &&
                <Box
                    background={props.announcement.status === 1 ? "neutral-1" : "neutral-4"}
                    pad="15px"
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
            `}</style>
        </Box>
    </Box>
)

export default Card