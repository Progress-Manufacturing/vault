import React, { Component } from "react"
import { Grommet, ResponsiveContext, Layer, Collapsible, Grid, Box } from "grommet"
import { withRouter } from "next/router"
import { progressTheme } from "./theme"

import * as VaultMenu from "../menu/vaultmenu"
import * as CiMenu from "../menu/cimenu"

import Authorization from "../auth/msal-auth"
import { getUserDetails, getUserSupervisor } from "../auth/msal-graph"

import AppBar from "../appbar"
import TopBar from "../topbar"
import Quicklinks from "../quicklinks"
import Head from "../head"

class Main extends Component {
  constructor() {
    super()
    this.state = { 
      showSidebar: true,
      me: null,
      admin: false,
    }
  }
  
  componentDidMount() {
    this.getUserData()
  } 

  handleClick = () => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))

  getUserData = async () => {
    const auth = new Authorization()
    let admin = false
  
    try {
      const token = await auth.getToken()
      const userData = await getUserDetails(token)
      const userSupervisor = await getUserSupervisor(token)
  
      // TODO: update for proper use with app API calls not user call
      if(userData.me !== null) {
        userData.groups.value.map((group) => {
          if(group.id === "f8bfb141-874b-491e-9114-b030640446e9") {
            admin = true
          }
        })
      }

      this.setState({
        me: userData.me,
        supervisor: userSupervisor.supervisor,
        admin: admin,
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const  { showSidebar } = this.state
    const { router } = this.props
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        me: this.state.me,
        supervisor: this.state.supervisor,
        admin: this.state.admin
      })
    })

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
                      <AppBar admin={this.state.admin} supervisor={this.props.supervisor} menu={ (router.pathname).includes("ci") ? CiMenu.CiMenu : VaultMenu.VaultMenu} />
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
                    <AppBar admin={this.state.admin} supervisor={this.props.supervisor} menu={ (router.pathname).includes("ci") ? CiMenu.CiMenu : VaultMenu.VaultMenu} />
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
                    {!(router.pathname).includes("ci") &&
                      <Quicklinks />
                    }
                    <Box
                      flex={true}
                      fill={true}
                      pad={{ vertical: "15px", horizontal: "80px" }}
                    >
                      {children}
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