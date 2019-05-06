import React, { Component } from "react"
import { Box, Text } from "grommet"
import { Schedule, Monitor, Services, CirclePlay, AddCircle, Notes } from "grommet-icons"
import Link from "next/link"

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
                    overflow={{ vertical: "hidden", horizontal: "scroll" }}
                >   
                    <Link href="https://progressmfg.bamboohr.com/time_off/requests/create">
                        <a>
                            <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                    <Schedule size="medium" />
                                    <Text size="xsmall" color="white" margin={{ top: "8px" }}>Request Time Off</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="http://192.168.1.45/helpdesk/"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <Monitor size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Helpdesk</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="mailto:maintenance@progressmfg.com?subject=New Maintenance Request"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <Services size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Maintenance</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="http://media/"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <CirclePlay size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Media Request</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="https://vault.progressmfg.com/comingsoon"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <AddCircle size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Submit iPoints</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="https://progressmfg.sharepoint.com/Meeting%20Notes/Forms/AllItems.aspx">
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <Notes size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Company Notes</Text>
                            </Box>
                        </a>
                    </Link>
                </Box>
                <style jsx>{`
                    a {
                        text-decoration: none;
                        transition: background 0.3s ease-in-out;
                    }
                    a:hover {
                        background: black;
                        
                    }
                `}</style>
            </Box>
        )
    }
}

export default QuickLinks