import Reaect, { Component } from 'react'
import { Box, Tabs, Tab } from 'grommet'

class CardWithTabs extends Component {
    render() {
        return (
            <Tabs>
                <Tab title="tab 1">
                    <Box pad="medium">One</Box>
                </Tab>
                <Tab title="tab 2">
                    <Box pad="medium">Two</Box>
                </Tab>
            </Tabs>
        )
    }
}

export default CardWithTabs