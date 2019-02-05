import React, { Component } from "react"
import { Grommet, Grid, Box, Accordion, AccordionPanel, Text } from "grommet"
import TopBar from "../topbar/topbar"
import AppBar from "../appbar/appbar"
import QuickLinks from "../quicklinks/quicklinks"

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
      lightGray: "#F0F2F5",
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
                background="lightGray"
                flex={true}
                fill={false}
                overflow="scroll"
              > 
                <QuickLinks />   
                <Box
                  flex={true}
                  fill={true}
                  pad="10px"
                >
                  {this.props.children}
                </Box>
              </Box> 
            </Grid>
          </Grommet>
        )
    }
}

export default AppLayout