import React from "react"
import { Grommet, Grid, Box } from "grommet"
import { css } from "styled-components"
import Head from "../head"

const progressLoginTheme = {
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
    }
  }
}

export default ({ children, title = "Progress Mfg. Login" }) => {
  return (
    <Grommet full theme={progressLoginTheme}>
      <Head title={title} />
      <Box
        flex={true}
        fill={true}
        background="lightGray"
        justify="center"
        align="center"
      > 
        {children}
      </Box>
    </Grommet>
  )
} 