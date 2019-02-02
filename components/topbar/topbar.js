import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import { Search, Notification, User } from 'grommet-icons'

const iconStyle = {
    marginRight: '15px'
}


class TopBar extends Component {
    render() {
        return(
            <Box
                direction='row'
                align='center'
                justify='end'
                pad={{ horizontal: 'medium', vertical: 'small'}}
                style={{ minHeight: '50px'}}
            >                
                <Search size='20px' style={iconStyle} />
                <Notification size='20px' style={iconStyle} />
                <User size='20px' sylte={iconStyle} />
            </Box>
        )
    }
}

export default TopBar
