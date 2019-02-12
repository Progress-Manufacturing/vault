import React, { Component } from "react"
import { Box, Text, Grid, Tabs, Tab } from "grommet"
import AppLayout from "../components/applayout/applayout"
import Card from "../components/card/card"
import CardWithTabs from "../components/card/cardtab";
// import Link from "next/link"

class Home extends Component {
  
  render() {
    return (
      <AppLayout>
        <Grid
          fill
          rows={["auto-fit", "flex"]}
          columns={["2/3", "flex"]}
          gap="small"
          areas={[
            { name: "content", start: [0, 0], end: [0, 1] },
            { name: "aside", start: [1, 0], end: [1, 1] }
          ]}
        >
          <Box 
            gridArea="content"
            fill={true}
            responsive={true}
          >
            <Card title="Announcements">
              <Text>Hello! Welcome to the new fancy vault for Progress Manufacturing! It's a beautiful vault is it not?! I think so...but I designed & developed it, so no big deal. Anyway, this is where you'll find the latest news and information about this wonderful company!</Text>
            </Card>
            
            <Card tabs={[{ name: "iPoints" }, { name: "Safety Points" }, { name: "Continual Improvement"}]}>
              <Text>Hello! Welcome to the new fancy vault for Progress Manufacturing! It"s a beautiful vault is it not?! I think so...but I designed & developed it, so no big deal. Anyway, this is where you'll find the latest news and information about this wonderful company!</Text>
            </Card>

            <Card title="Progress Mfg. Profit Sharing">
              <Text>Hello! Welcome to the new fancy vault for Progress Manufacturing! It's a beautiful vault is it not?! I think so...but I designed & developed it, so no big deal. Anyway, this is where you'll find the latest news and information about this wonderful company!</Text>
            </Card>
          </Box>
          <Box 
            gridArea="aside"
            fill={true}
            flex={true}
          >
            <Card title="Provo Weather">
              <Text>Hello! Welcome to the new fancy vault for Progress Manufacturing! It's a beautiful vault is it not?! I think so...but I designed & developed it, so no big deal. Anyway, this is where you'll find the latest news and information about this wonderful company!</Text>
            </Card>
          </Box>
        </Grid>
        
      </AppLayout>
    )
  }
}

export default Home
