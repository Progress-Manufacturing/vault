import React, { Component } from 'react'
import { Grommet, Box, Button, Grid, Text } from 'grommet'
// import TopBar from '../topbar/topbar'
import SideBar from '../sidebar/sidebar';
import { red } from 'ansi-colors';

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
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0,1 ] },
                { name: 'main', start: [1, 1], end: [1, 1] }
              ]}
            >
                {/* <TopBar/> */}
                <SideBar/>
                <Box gridArea='main' justify='center' align='center'>
                    <Text>{this.props.children}</Text>
                </Box>
            </Grid>
          </Grommet>
        )
    }
}

export default Layout