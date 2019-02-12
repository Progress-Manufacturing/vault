import { Box, Text } from 'grommet'

const Card = (props) => (
    <Box 
        background="white"
        round="4px"
        flex={{ grow: 0, shrink: 0 }}
        overflow="hidden"
        border={{ size: "1px", color: "lightGray" }}
        margin={{ vertical: "15px", horizontal: "0px" }}
    >
        <Box>
            <Box
                border={{ side: "bottom", color: "lightGray", size: "1px" }}
                background="#FAFAFA"
                align="start"
            >
                <Box    
                    width="auto"
                    flex={false}
                    fill={false}
                    align="start"
                    pad={{ vertical: "10px", horizontal: "5px" }}
                    margin={{ vertical: "0px", horizontal: "10px" }}
                >
                    <Text textAlign="start" size="16px"><strong>{props.title}</strong></Text>
                </Box>
            
            </Box>
            <Box flex={true} pad={{ vertical: "15px", horizontal: "25px" }} align="start">
                {props.children}
            </Box>
        </Box>
    </Box>
)

export default Card