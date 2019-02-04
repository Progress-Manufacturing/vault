import React, { Component } from "react"
import { Grommet, Grid, Box, Accordion, AccordionPanel, Text } from "grommet"
import TopBar from "../topbar/topbar"
import AppBar from "../appbar/appbar"
import QuickLinks from "../quicklinks/quicklinks"
import { border } from "polished";

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
      lightBlack: "#343434",
      border: "transparent"
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
              rows={["auto", "flex"]}
              columns={["auto", "flex"]}
              areas={[
                { name: "appbar", start: [0, 0], end: [0, 1] },
                { name: "header", start: [1, 0], end: [1, 0] },
                { name: "main", start: [1, 1], end: [1, 1] }
              ]}
            >
              <AppBar area="appbar" />
              <TopBar area="header"/>              
              <Box 
                gridArea="main"
                background="purple"
                fill="vertical"
                responsive={true} 
                fill={false}
                flex={true}
              >
                <Box
                  flex={true}
                  overflow="scroll"
                  color="white"
                  pad="25px"
                >
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  <Text color="white">Testing</Text>
                  

                  
                </Box>
         
              </Box> 
            </Grid>
          </Grommet>
        )
    }
}

export default AppLayout