import { Box, Stack, Text } from "grommet"
import { Notification, User } from "grommet-icons"

const TopBar = (props) => (
    <Box 
        gridArea={props.area}
        direction="row"
        align="center"
        justify="end"
        height="55px"
        pad={{ horizontal: "medium", vertical: "small"}}
    >
        <Box margin={{ right: "15px"}}>
            <Stack anchor="top-right" margin={{ top: "8px" }}>
                <Notification size="20px" />
                <Box
                    background="brand"
                    round="50%"
                    width="14px"
                    height="14px"
                    flex={true}
                    alignContent="center"
                    justify="center"
                    align="center"
                    margin={{ top: "-3px" }}
                >
                    <Text size="8px">8</Text>
                </Box>
            </Stack>
        </Box>
        <Box>
            <User size="20px" />        
        </Box>
    </Box>
)

export default TopBar
