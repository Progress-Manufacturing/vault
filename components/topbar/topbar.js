import React from 'react'
import { Box, Text, Image } from 'grommet'
import styled from 'styled-components'

const TopBarLogoBox = styled(Box)`
    max-height: 60px;
`

const TopBar = () => (
    <Box
        gridArea='header'
        direction='row'
        align='center'
        justify='between'
        pad={{ horizontal: 'medium', vertical: 'small'}}
    >
        <TopBarLogo src='../../static/progress-logo.svg' fit='contain' alignSelf='start'/>
        {/* <TopBarLogoBox height='small' width='small' alignContent='center'>
            
        </TopBarLogoBox> */}
        <Text>Testing</Text>
    </Box>
)

export default TopBar
