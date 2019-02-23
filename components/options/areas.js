import React, { Component } from "react"
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Box, CheckBox } from "grommet"

const GET_AREAS = gql`
    query allAreas {
        allAreas {
            id
            name
        }
    }
`

const Areas = (props) => (
    <Query query={GET_AREAS} >
        {({ loading, error, data }) => {
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`
            return (
                <Box
                    direction="row"
                    wrap={true}
                    pad={{ vertical: "10px", horizontal: "25px" }}
                >
                    {data.allAreas.map(item =>
                        <Box
                            key={item.id}
                            direction="row"
                            fill={false}
                            flex={false}
                            width="50%"
                            margin={{ vertical: "5px" }}
                        >
                            <CheckBox                                
                                key={item.id}
                                checked={props.checked.indexOf(item.id) !== -1}
                                label={item.name}
                                value={item.id}
                                onChange={e => props.handleClick(e, item.id)}
                            />                                
                        </Box>
                    )}
                </Box>
            )
        }}
    </Query>
)
export default Areas