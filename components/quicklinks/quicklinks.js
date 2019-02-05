import React, { Component } from "react"
import { Box, Text, Button } from "grommet"
import { Schedule, Monitor, Services, CirclePlay, AddCircle, Notes } from "grommet-icons"
import styled from 'styled-components'

const QuickLinkButton = styled(Button)`
    &:hover > div > svg{
        stroke: black;
    }
`
class QuickLinks extends Component {
    render() {
        return( 
            <Box
                direction="row"
            > 
                <Box
                    background="brand"
                    direction="row"
                    round={{ size: "10px", corner: "bottom-right" }}
                    overflow="hidden"
                >
                <Box>
                    <QuickLinkButton hoverIndicator fill> 
                        <Box justify="center" align="center" pad="20px">
                            <Schedule size="medium" />
                            <Text size="xsmall">Request Off</Text>
                        </Box>
                    </QuickLinkButton>
                </Box>
                <Box>
                    <QuickLinkButton hoverIndicator fill> 
                        <Box justify="center" align="center" pad="20px">
                            <Monitor size="medium" />
                            <Text size="xsmall">Helpdesk</Text>
                        </Box>
                    </QuickLinkButton>
                </Box>
                <Box>
                    <QuickLinkButton hoverIndicator fill> 
                        <Box justify="center" align="center" pad="20px">
                            <Services size="medium" />
                            <Text size="xsmall">Maintenance</Text>
                        </Box>
                    </QuickLinkButton>
                </Box>
                <Box>
                    <QuickLinkButton hoverIndicator fill> 
                        <Box justify="center" align="center" pad="20px">
                            <CirclePlay size="medium" />
                            <Text size="xsmall">Media Request</Text>
                        </Box>
                    </QuickLinkButton>
                </Box>
                <Box>
                    <QuickLinkButton hoverIndicator fill> 
                        <Box justify="center" align="center" pad="20px">
                            <AddCircle size="medium" />
                            <Text size="xsmall">Submit Points</Text>
                        </Box>
                    </QuickLinkButton>
                </Box>
                <Box>
                    <QuickLinkButton hoverIndicator fill> 
                        <Box justify="center" align="center" pad="20px">
                            <Notes size="medium" />
                            <Text size="xsmall">Company Notes</Text>
                        </Box>
                    </QuickLinkButton>
                </Box>
                </Box>
            </Box>
        )
    }
}

export default QuickLinks