import React, { Component } from 'react'
import { Box, Text, Button } from 'grommet'

class Card extends Component {
    render() {
        return (
            <Box 
                background="white"
                elevation="xsmall"
                round="4px"
                overflow="hidden"
                margin={{ vertical: "10px", horizontal: "0px" }}
            >
                {this.props.tabs &&
                    <Box>
                        <Box
                            border={{ side: "bottom", color: "lightGray", size: "1px" }}
                            align="start"
                            direction="row"
                        >
                            {this.props.tabs.map(tab => 
                                <Box
                                    border={{ side: "bottom", color: "brand", size: "2px" }}
                                    width="auto"
                                    flex={false}
                                    fill={false}
                                    align="start"
                                    pad={{ vertical: "10px", horizontal: "15px" }}
                                    margin={{ vertical: "0px", horizontal: "15px" }}
                                >
                                    <Text textAlign="start">{tab.name}</Text>
                            </Box>
                            )}

                        </Box>
                        <Box pad={{ vertical: "10px", horizontal: "20px" }}>
                            <Box direction="row" margin={{ bottom: "15px", top: "10px" }}>
                                <Box 
                                    direction="row" 
                                    border={{ color: "black", size: "2px" }}
                                    round="8px"
                                    margin={{ right: "15px" }}
                                    pad={{ vertical: "5px", horizontal: "10px" }}
                                >
                                    Your iPoints: <strong>120</strong>
                                </Box>
                                <Box 
                                    direction="row"
                                    border={{ color: "black", size: "2px" }}
                                    round="8px"
                                    margin={{ right: "15px" }}
                                    pad={{ vertical: "5px", horizontal: "10px" }}
                                >
                                    Department iPoints: <strong>400</strong>
                                </Box>
                            </Box>
                            {this.props.children}
                        </Box>
                    </Box>
                }

                {this.props.title &&
                    <Box>
                        <Box
                            border={{ side: "bottom", color: "lightGray", size: "1px" }}
                            align="start"
                        >
                            <Box
                                    border={{ side: "bottom", color: "brand", size: "2px" }}
                                    width="auto"
                                    flex={false}
                                    fill={false}
                                    align="start"
                                    pad={{ vertical: "10px", horizontal: "15px" }}
                                    margin={{ vertical: "0px", horizontal: "15px" }}
                                >
                                    <Text textAlign="start">{this.props.title}</Text>
                                </Box>
                            
                        </Box>
                        <Box pad="25px">
                            {this.props.children}
                        </Box>
                    </Box>
                }
                
            </Box>
        )
    }
}

export default Card