import React, { Component } from 'react'
import { Box, Button, Text, Collapsible } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons'
import styled from 'styled-components'

const TopLevelMenuButton = styled(Button)`
    width: 100%;
`
const SubCollapsible = styled(Collapsible)`
    width: 100%
`

const MenuLinks = styled(Text)`
  font-size: 14px;
  line-height: 20px;
`
const SubMenuButton = styled(Button)`
    width: 100%;
    opacity: 0.8;
`

class MenuCollapsible extends Component {
    state = {
        open: false
    }
    render() {
        const { open } = this.state
        return (
            <Box key={this.props.id} align='start' gap='small'>
                <TopLevelMenuButton hoverIndicator onClick={() => this.setState({ open: !open })}>
                    <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                        <MenuLinks>{this.props.icon} {this.props.name} <FormDown size='18px' color='white' style={{ margin: '0 0 0 auto', float: 'right', position: 'relative', top: '5px' }}/></MenuLinks>
                    </Box>
                </TopLevelMenuButton>
                <SubCollapsible open={open} {...this.props}>
                        {(this.props.submenu).map(subitem => (
                            <SubMenuButton key={subitem.id} hoverIndicator href={subitem.link}>
                                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                                    <MenuLinks style={{ paddingLeft: '32px'}}>{subitem.name}</MenuLinks>
                                </Box>
                            </SubMenuButton>
                        ))}
                </SubCollapsible>
            </Box>
        )
    }
}

export default MenuCollapsible
