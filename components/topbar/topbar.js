import React, { Component } from "react"
import { Box, Text } from "grommet"
import { Search, Notification, User } from "grommet-icons"

const iconStyle = {
    marginRight: "15px"
}

class TopBar extends Component {
    render() {
        return(
            <Box 
                gridArea={this.props.area}
                direction="row"
                align="center"
                justify="end"
                height="55px"
                pad={{ horizontal: "medium", vertical: "small"}}
            >
                <Search size="20px" style={iconStyle} />
                <Notification size="20px" style={iconStyle} />
                <User size="20px" sylte={iconStyle} />
            </Box>
        )
    }
}

export default TopBar
