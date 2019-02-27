import React, { Component } from "react"
import { Grommet, ResponsiveContext, Layer, Collapsible, Grid, Box } from "grommet"
import { Router,withRouter } from "next/router"
import { css } from "styled-components"
import * as VaultMenu from "./menu/vaultmenu"
import * as CiMenu from "./menu/cimenu"
import AppBar from "./appbar"
import TopBar from "./topbar"
import Quicklinks from "./quicklinks"
import Head from "./head"

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
      lighterBlack: "rgba(52, 52, 52, 0.5)",
      lightGray: "#F0F2F5",
      border: "transparent"
    },
    hover: {
      color: "#000000",
    },
    opacity: {
      medium: 1
    },
  },
  layer: {
    background: "rgba(0,0,0,0.6)"
  },
  tab: {
    active: {      
      color: "brand"
    },
    background: "white",
    color: "black",
    hover: { 
      color: "lighterBlack"
    },
    border: {
      active: {
        color: "brand"
      },
      hover: {
        color: "active"
      },
      size: "2px",
      color: "transparent",
      side: "bottom"
    },
    margin: undefined,
    pad: {
      bottom: "5px",
      horizontal: "25px"
    }
  },
  tabs: {
    background: "white",
    header: {
      background: "white",
      extend: ({ theme }) => css`
        border-bottom: 1px solid lightGray;
        padding: 10px 25px 0px;
      `
    },
    gap: "medium"
  }
}

class Main extends Component {
  state = { showSidebar: true }
  handleClick = () => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))  

  componentDidMount() {
    Router.events.on('routeChangeStart', this.handleClick)  
  }
  
  render(props) {
    const  { showSidebar } = this.state
    const { router } = this.props
    let ciMenu


    
    if ((router.pathname).includes("ci")) {
      ciMenu = true
    } else {
      ciMenu = false
    }

    return (
      <Grommet full theme={progressTheme}>
        <Head title="Progress Mfg. Vault" />
        <ResponsiveContext.Consumer>
          {size => (
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
              {(!showSidebar || size !== "small") ? (
                <Box gridArea="appbar" background="lightBlack">
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <AppBar menu={ ciMenu === true ? CiMenu.CiMenu : VaultMenu.VaultMenu} />
                  </Collapsible>
                </Box>
              ) : (
                <Layer
                  full="vertical"
                  animate
                  onEsc={this.handleClick}
                  onClickOutside={this.handleClick}
                  position="left"
                  responsive={false}
                >
                  <AppBar menu={ ciMenu === true ? CiMenu.CiMenu : VaultMenu.VaultMenu} />
                </Layer>
              )}
              
              
              
              <TopBar area="header" handleClick={this.handleClick} />
              <Box 
                  gridArea="main"
                  background="lightGray"
                  flex={true}
                  fill={false}
                  overflow="scroll"
                > 
                  {ciMenu === false &&
                    <Quicklinks />
                  }
                  <Box
                    flex={true}
                    fill={true}
                    pad={{ vertical: "0", horizontal: "15px" }}
                  >
                    {this.props.children}
                  </Box>
              </Box> 
            </Grid>
          )}
        </ResponsiveContext.Consumer>
        <style jsx global>{`
          button.AccordionButton {
            display: flex;
            padding: 0 20px;
            align-items: center;
            justify-content: flex-start;
            transition: all 0.3s ease-in-out;
          }
          button.AccordionButton:hover{
            background-color: #545454;
            color: white;
          }
          .SubMenuButton {
            display: flex;
            padding: 0 20px 0 52px;
            opacity: 0.8;
            align-items: center;
          }
          .SimpleButton, a.SimpleButton {
            background: #D0011B;
            text-transform: uppercase;
            color: white;
            border: none;
            border-radius: 4px;
            text-align: center;
            font-size: 14px;
            font-weight: normal;
            padding: 15px;
            transition: background 0.3s ease-in-out;
            display: inline-block;
          }
          .SimpleButton:hover, a.SimpleButton:hover {
            border: none;
            box-shadow: none;
            background: black; 
          }
          a.SimpleButtonSecondary{
            background: #F3DE8A;
            text-transform: uppercase;
            color: black;
            border: none;
            border-radius: 4px;
            text-align: center;
            font-size: 14px;
            font-weight: normal;
            padding: 15px;
            display: inline-block;
            transition: background 0.3s ease-in-out;
          }
          a.SimpleButtonSecondary:hover {
            border: none;
            box-shadow: none;
            background: black; 
            color: white;
          }
          a > span > svg.MenuIcon, .AccordionButton > div > svg.MenuIcon {
            transition: all 0.3s ease-in-out;
          }
          textarea {
            border: 1px solid lightGray !important;
            min-height: 150px;
          }
          .PositionRelative{
            position: relative;
          }
          sup {
            color: red;
            font-size: 12px;
          }
        `}</style>
      </Grommet>   
    )
  }
}

export default withRouter(Main)