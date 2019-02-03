import React, { Component } from 'react'
import { Button, Box } from 'grommet'
import styled from 'styled-components'

const MenuButton = styled(Button)`
    display: flex;
    padding: 15px 20px;
    &:hover > div > svg{
        stroke: black;
    }
`

class AppBarItem extends Component {
    render() {
        return (
            <Box 
                height='50px'
                direction='row'
                fill='horizontal'
            >
                <MenuButton
                    href={this.props.link} 
                    icon={this.props.icon} 
                    label={this.props.name} 
                    focusIndicator={false}
                    alignSelf='start'
                    hoverIndicator
                    plain
                    fill
                />
            </Box>
        )
    }
}

export default AppBarItem