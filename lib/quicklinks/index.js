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
                    <Link href="#">
                        <a>
                            <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                    <Schedule size="medium" />
                                    <Text size="xsmall" color="white" margin={{ top: "8px" }}>Request Off</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="#"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <Monitor size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Helpdesk</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="#"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <Services size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Maintenance</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="#"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <CirclePlay size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Media Request</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="#"> 
                        <a>
                        <Box justify="center" align="center" width="115px" pad={{ vertical: "20px", horizontal: "0" }}>
                                <AddCircle size="medium" />
                                <Text size="xsmall" color="white" margin={{ top: "8px" }}>Submit Points</Text>
                            </Box>
                        </a>
                    </Link>
                    <Link href="#">
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