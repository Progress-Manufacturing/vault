import React, { Component } from 'react'
import { Button, Box, Text } from 'grommet'
import styled from 'styled-components'

const MenuLinks = styled(Text)`
  font-size: 14px;
  line-height: auto;
`

class MenuItem extends Component {
    render() {
        return (
            <Button key={this.props.id} hoverIndicator href={this.props.link}>
                <Box pad={{ horizontal: 'medium', vertical: 'small'}} responsive='false'>
                    <MenuLinks>{this.props.icon} {this.props.name}</MenuLinks>
                </Box>
            </Button>
        )
    }
}

export default MenuItem