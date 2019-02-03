import React, { Component } from 'react'
import { Grommet, Grid } from 'grommet'
// import TopBar from '../topbar/topbar'
import AppBar from '../appbar/appbar'
// import QuickLinks from '../quicklinks/quicklinks'

const progressTheme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
    },
    colors: {
      brand: "#D0011B",
      focus: "#D0011B",
      active: "#F3DE8A",
      lightBlack: "#343434"
    },
    hover: {
      color: "#000000",
    },
    opacity: {
      medium: 1
    }
  }
}

class AppLayout extends Component {
    render() {   
        return (
          <Grommet full theme={progressTheme}>
            <Grid
              fill
              rows={['auto', 'flex']}
              columns={['auto', 'flex']}
              areas={[
                { name: 'appbar', start: [0, 0], end: [0, 0] },
                { name: 'header', start: [1, 0], end: [1, 0] },
                { name: 'main', start: [1, 1], end: [1, 1] }
              ]}
            >
              
              <AppBar gridArea='appbar' />
              
              
              {/* <Box background='red' style={{ height: '300px'}}>
                <Text gridArea='header'>Text</Text>
              </Box>             
              <Box background='blue' style={{ height: '300px'}}>
                <Text gridArea='main'>Text</Text>
              </Box>
               */}
              
              {/* <TopBar gridArea='header' />
              <Box gridArea='main' style={{ background: 'purple', display: 'block'}}>
                <QuickLinks />  
              </Box>  */}
            </Grid>
          </Grommet>
        )
    }
}

export default AppLayout