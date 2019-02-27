import { Box, Stack, Text, Button } from "grommet"
import { Menu, Notification, User } from "grommet-icons"

const TopBar = (props) => (
    <Box 
        gridArea={props.area}
        direction="row"
        align="center"
        height="55px"
        pad={{ horizontal: "medium", vertical: "small"}}
    >

        <Box
            direction="row"
            align="center"
            justify="start"
            flex={true}
        >   
            <Button 
                style={{ paddingLeft: "0px" }}
                margin={{ top: "9px", left: "0px" }}
                flex={true}
                align="center"
                icon={<Menu size="20px" />}
                onClick={props.handleClick}
            />
            
        </Box>
        <Box
            direction="row"
            align="center"
            justify="end"
            flex={true}
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
    </Box>
)

export default TopBar
