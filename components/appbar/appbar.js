import React, { Component } from 'react'
import { Box, Image, Layer } from 'grommet'
import * as AppBarMenu from './appbarmenu'
import AppBarItem from './appbaritem'
import AppBarAccordion from './appbaraccordion'

const menu = AppBarMenu.AppBarMenu

class AppBar extends Component {
    render() {
        return(
            // <Layer modal={false} plain={true} position='left' full='vertical'>
                <Box  
                    background='lightBlack'
                    width='250px'
                    overflow='scroll'
                    flex={false}
                    elevation='large'
                    fill='vertical'
                >
                    <Box
                        background='black'
                        height='55px'
                        pad='12px'
                    >
                        <Image src='../../static/progress-logo.svg' fit='contain' alignSelf='start' style={{ maxHeight: '100%'}}/>
                    </Box>
                    <Box>
                        {menu.map(item => {
                            if(!item.sub) 
                                return (
                                    <AppBarItem key={item.id} name={item.main.name} link={item.main.link} icon={item.icon}/>
                                )
                            return <AppBarAccordion key={item.id} name={item.main.name} icon={item.icon} submenu={item.sub}/>
                        })}
                    </Box>
                </Box> 
            // </Layer>  
        )
    }
}

export default AppBar