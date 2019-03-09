import { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import jsCookie from "js-cookie"

import redirect from "../auth/redirect"

import { Box, Menu, Image, Stack, Text, Button } from "grommet"
import { Menu as MenuIcon, Notification, User } from "grommet-icons"

class TopBar extends Component {
    signout = apolloClient => () => {
        jsCookie.set("token", "", { expires: -1 })
        jsCookie.set("access_token", "", { expires: -1 })
        jsCookie.set("id_token", "", { expires: -1 })
    
        // Force a reload of all the current queries now that the user is
        // logged in, so we don't accidentally leave any state around.
        apolloClient.cache.reset().then(() => {
          // Redirect to a more useful page when signed out
          redirect({}, '/login')
        })
    }

    setAvatar(blob) {
        const avatarImage = URL.createObjectURL(blob);
        return avatarImage
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Box 
                        gridArea={this.props.area}
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
                                icon={<MenuIcon size="20px" />}
                                onClick={this.props.handleClick}
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
                            <Box
                                round="50%"
                                overflow="hidden"
                                width="32px"
                                height="32px"
                            >
                            <Image
                                fit="cover"
                                id="avatar"
                                src={this.setAvatar(this.props.avatar)}
                            />
                            {/* <Menu
                                icon={<User size="20px" />}
                                dropAlign={{ top: "top", right: "right" }}
                                alignSelf="end"
                                justifyContent="end"
                                items={[
                                    { label: 'Log Out', onClick: this.signout(client) }
                                ]}
                            /> */}
                            {/* <button onClick={this.signout(client)}>Sign out</button> */}
                            </Box>
                        </Box>
                    </Box>
                )}
            </ApolloConsumer>
        )
    }
}

export default TopBar