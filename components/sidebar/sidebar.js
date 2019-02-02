import React, { Component } from 'react'
import { Box, Image } from 'grommet'
import * as Menu from './menu'
import MenuItem from './menuitem'
import CustomHeaderAccordion from './menuaccordion'
import styled from 'styled-components'

const SideBarBox = styled(Box)`
  background: red;
  box-shadow: 0 5px 5px -2px rgba(0,0,0,0.3);
  background: #343434;
  color: #FFFFFF;
  height: 100%;
  overflow: scroll;
`
const LogoBox = styled(Box)`
  min-height: 65px;
  max-height: 65px;
  height: 65px;
  align-items: center;
  background: #000000;
  padding: 15px;
  overflow: hidden;
`
const Logo = styled(Image)`
  max-height: 100%;
`

const menu = Menu.Menu

class SideBar extends Component {
    render() {
        return(
            <SideBarBox  
                gridArea='sidebar' 
                width='250px'        
            >
                <LogoBox>
                    <Logo src='../../static/progress-logo.svg' fit='contain' alignSelf='start' />
                </LogoBox>
                <Box>
                    {menu.map(item => {
                        if(!item.sub) 
                            return (
                                <MenuItem id={item.id} name={item.main.name} link={item.main.link} icon={item.icon}/>
                            )
                        return <CustomHeaderAccordion id={item.main.id} name={item.main.name} icon={item.icon} submenu={item.sub}/>
                    })}
                </Box>
            </SideBarBox>
        )
    }
}

export default SideBar