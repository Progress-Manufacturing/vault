import React, { Component } from 'react'
import { Box, Button, Text, Collapsible } from 'grommet'
import { FormDown } from 'grommet-icons'
import styled from 'styled-components'

const MenuButton = styled(Button)`
    display: flex;
    padding: 0 20px;
    &:hover > div > svg{
        stroke: black;
    }
`

const SubMenuButton = styled(Button)`
    display: flex;
    padding: 0 20px 0 52px;
    opacity: 0.8;
    align-items: center;
`

const arrowStyleDown = {
    position: 'relative',
    top: '5px',
    float: 'right',
    transform: 'rotate(0deg)',
    willChange: 'transform',
    transition: 'transform 0.3s ease-in-out'
}

const arrowStyleUp = {
    position: 'relative',
    top: '5px',
    float: 'right',
    transform: 'rotate(180deg)',
    willChange: 'transform',
    transition: 'transform 0.3s ease-in-out'
}

class AppBarAccordion extends Component {
    state = {
        open: false
    }
    render() { 
        const { open } = this.state
        
        // let self = this
        // function rotateDropDown() {
        //     if (self.state.open === true) {
        //         return <FormDown color='white' size='18px' style={arrowStyleUp} />
        //     } else {
        //         return <FormDown color='white' size='18px' style={arrowStyleDown}/>    
        //     }
        // }       

        return (
            <Box>
                 <Box
                    height='50px'
                    direction='row'
                    fill='horizontal'
                    flex={{ grow: 0, shrink: 0 }}
                >
                    <MenuButton
                        icon={this.props.icon} 
                        label={this.props.name} 
                        onClick={() => this.setState({ open: !open })}
                        focusIndicator={false}
                        alignSelf='start'
                        hoverIndicator
                        plain
                        fill
                    />
                </Box>
                <Collapsible open={open} {...this.props}>    
                    {(this.props.submenu).map(subitem => (
                        <Box
                            key={subitem.id}
                            height='40px'
                            direction='row'
                            fill='horizontal'
                            flex={{ grow: 0, shrink: 0 }}
                        >
                            <SubMenuButton
                                href={subitem.link}
                                label={subitem.name}
                                focusIndicator={false}
                                alignSelf='start'
                                hoverIndicator
                                plain
                                fill
                            />
                        </Box>
                    ))}
                </Collapsible>
            </Box>
        )
    }
}

export default AppBarAccordion
