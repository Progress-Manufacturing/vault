import React, { Component } from 'react'
import { Grommet, Box, Grid } from 'grommet'
import styled from 'styled-components'
import TopBar from '../topbar/topbar'
import SideBar from '../sidebar/sidebar'
import QuickLinks from '../quicklinks/quicklinks'

const progressTheme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
    },
    colors: {
      brand: '#D0011B',
      focus: '#D0011B'
    }
  }
}

class Layout extends Component {
    render() {   
        return (
          <Grommet full theme={progressTheme}>
            <Grid
              fill
              rows={['auto', 'flex']}
              columns={['auto', 'flex']}
              areas={[
                { name: 'sidebar', start: [0, 0], end: [0, 1] },
                { name: 'header', start: [1, 0], end: [1, 0] },
                { name: 'main', start: [1, 1], end: [1, 1] },
              ]}
            >
              <SideBar gridArea='sidebar' />              
              <TopBar gridArea='header' />
              <Box gridArea='main' style={{ background: 'purple', display: 'block'}}>
                <QuickLinks />  
              </Box> 
            </Grid>
          </Grommet>
        )
    }
}

export default Layout