import { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

import redirect from '../auth/redirect';
import jsCookie from 'js-cookie';

import { Box, Image, Button, DropButton } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';

class TopBar extends Component {

    signout = apolloClient => () => {
        apolloClient.cache.reset().then(() => {
            localStorage.clear();
            jsCookie.remove('token');
            redirect({}, '/login')
        })
    }

    render() {
        const { avatar, area } = this.props
        
        return (
            <ApolloConsumer>
                {client => (
                    <Box 
                        gridArea={area}
                        direction='row'
                        align='center'
                        height='55px'
                        pad={{ horizontal: 'medium', vertical: 'small'}}
                    >
                        <Box
                            direction='row'
                            align='center'
                            justify='start'
                            flex={true}
                        >   
                            <Button 
                                style={{ paddingLeft: '0px' }}
                                margin={{ left: '0px' }}
                                flex={true}
                                align='center'
                                icon={<MenuIcon size='20px' />}
                                onClick={this.props.handleClick}
                            />
                            
                        </Box>
                        <Box
                            direction='row'
                            align='center'
                            justify='end'
                            flex={true}
                        >
                            {/* <Box margin={{ right: '15px'}}>
                                <Stack anchor='top-right' margin={{ top: '8px' }}>
                                    <Notification size='20px' />
                                    <Box
                                        background='brand'
                                        round='50%'
                                        width='14px'
                                        height='14px'
                                        flex={true}
                                        alignContent='center'
                                        justify='center'
                                        align='center'
                                        margin={{ top: '-3px' }}
                                    >
                                        <Text size='8px'>8</Text>
                                    </Box>
                                </Stack>
                            </Box> */}
                            
                            <DropButton
                                alignSelf='center'
                                margin={{ vertical: 'small' }}
                                dropContent={
                                    <Button 
                                        label='Log Out'
                                        onClick={this.signout(client)}
                                        className='logoutButton'
                                    />
                                }
                                dropAlign={{ top: 'bottom' }}
                            >
                                <Box
                                    round='50%'
                                    overflow='hidden'
                                    width='32px'
                                    height='32px'
                                >
                                    <Image
                                        fit='cover'
                                        id='avatar'
                                        src={`${avatar}`}
                                    />
                                </Box>
                            </DropButton>
                        </Box>
                        <style jsx global>{`
                            button.logoutButton {
                                border: none;
                                box-shadow: none;
                                margin: 10px;
                                background: #D0011B;
                                border-radius: 4px;
                                transition: background 0.3s ease-in-out;
                                color: white;
                            }
                            button.logoutButton:hover {
                                box-shadow: none;
                                background: black;
                            }
                        `}</style>
                    </Box>
                )}
            </ApolloConsumer>
        )
    }
}

export default TopBar