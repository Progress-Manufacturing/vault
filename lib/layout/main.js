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
  state = { 
    showSidebar: true,
    me: {}
  }

  componentDidMount() {
    this.getUserData()
    if (window.innerWidth > 768) {
      this.setState({showSidebar: false })
    }
  } 

  handleClick = () => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))

  getUserData = async () => {
    const auth = new Authorization()
  
    try {
      const token = await auth.getToken()
      const userData = await getUserDetails(token)
      const userSupervisor = await getUserSupervisor(token)

      this.setState({
        me: userData.me,
        userSupervisor: userSupervisor.supervisor,
      })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const  { showSidebar, me, userSupervisor } = this.state
    const { router, isSupervisor, isLead, isAdmin, children } = this.props
    const child = React.Children.map(children, child => {
      return React.cloneElement(child, [{
        me: me,
        supervisor: userSupervisor
      }])
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
                      <AppBar 
                        isSupervisor={isSupervisor} 
                        isLead={isLead} 
                        isAdmin={isAdmin} 
                        menu={ (router.pathname).includes("ci") ? CiMenu.CiMenu : VaultMenu.VaultMenu} 
                      />
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
                    <AppBar 
                      isSupervisor={isSupervisor}
                      isLead={isLead}
                      isAdmin={isAdmin} 
                      menu={ (router.pathname).includes("ci") ? CiMenu.CiMenu : VaultMenu.VaultMenu} 
                    />
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
                      margin={{ horizontal: "auto" }}
                      pad={{ vertical: "15px", horizontal: "10px" }}
                      style={{ maxWidth: "1200px" }}
                    >
                      {child}
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