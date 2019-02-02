import React, { Component } from 'react'
import { Grommet, Box, Grid, Text } from 'grommet'
import TopBar from '../topbar/topbar'
import SideBar from '../sidebar/sidebar'

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
              <Box fill='false' gridArea='main' justify='center' align='center' style={{ background: 'red'}}>
                <Text>{this.props.children}</Text>
              </Box> 
            </Grid>
          </Grommet>
        )
    }
}

export default Layout