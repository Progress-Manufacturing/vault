import React, { Component } from "react"
import { Box, Image } from "grommet"
import * as AppBarMenu from "./appbarmenu"
import AppBarItem from "./appbaritem"
import AppBarAccordion from "./appbaraccordion"
import styled from 'styled-components'

const menu = AppBarMenu.AppBarMenu

class AppBar extends Component {
    render() {
        return(
                <Box
                    fill="vertical"
                    overflow="scroll"
                    width="250px"
                    background="lightBlack"
                    direction="column"
                    responsive={true}
                    gridArea="appbar"
                >
                    <Box
                        background="black"
                        height="55px"
                        pad="12px"
                        flex={{ grow: 0, shrink: 0 }}
                    >
                        <Image src="../../static/progress-logo.svg" fit="contain" alignSelf="start" style={{ maxHeight: "100%"}} />
                    </Box>
                    <Box 
                        fill={false}
                        flex={{ grow: 0, shrink: 0 }}
                        basis="auto"
                        direction="column"
                    >
                        {menu.map(item => {
                            if(!item.sub) 
                                return (
                                    <AppBarItem key={item.id} name={item.main.name} link={item.main.link} icon={item.icon} />
                                )
                            return (<AppBarAccordion key={item.id} name={item.main.name} icon={item.icon} submenu={item.sub} />)
                        })}
                    </Box>
                </Box>
        )
    }
}

export default AppBar