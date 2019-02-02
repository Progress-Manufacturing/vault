import React, { Component } from 'react'
import { Box, Button, Text, Collapsible } from 'grommet'
import { FormDown } from 'grommet-icons'
import styled from 'styled-components'

const TopLevelMenuButton = styled(Button)`
    width: 100%;
`

const MenuLinks = styled(Text)`
  font-size: 14px;
  line-height: auto;
`
const SubMenuButton = styled(Button)`
    width: 250px;
    opacity: 0.7;
`
const DropdownIcon = styled(FormDown)`
    margin: 0 0 0 auto;
    float: right;
    position: relative;
    top: 5px;
    font-size: 18px;
    color: white;
    transition: transform 0.3s ease-in-out;
    transform: rotate(0deg);
    will-change: transform;
`

class MenuCollapsible extends Component {
    state = {
        open: false
    }
    render() { 
        const { open } = this.state
        let self = this
        function rotateDropDown() {
            if (self.state.open === true) {
                return <DropdownIcon color='white' size='18px' style={{ transform: 'rotate(180deg)'}} />
            } else {
                return <DropdownIcon color='white' size='18px'/>    
            }
        }       

        return (
            <Box key={this.props.id} align='start' gap='small'>
                <TopLevelMenuButton hoverIndicator onClick={() => this.setState({ open: !open })}>
                    <Box pad={{ horizontal: 'medium', vertical: 'small'}} responsive='false'>
                        <MenuLinks>{this.props.icon} {this.props.name} {rotateDropDown()}</MenuLinks>
                    </Box>
                </TopLevelMenuButton>
                <Collapsible open={open} {...this.props}>
                        {(this.props.submenu).map(subitem => (
                            <SubMenuButton key={subitem.id} hoverIndicator href={subitem.link}>
                                <Box pad={{ horizontal: 'medium', vertical: 'xsmall' }} responsive='false'>
                                    <MenuLinks style={{ paddingLeft: '32px'}}>{subitem.name}</MenuLinks>
                                </Box>
                            </SubMenuButton>
                        ))}
                </Collapsible>
            </Box>
        )
    }
}

export default MenuCollapsible
