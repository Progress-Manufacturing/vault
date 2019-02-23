import React, { Component } from "react"
import { Box, CheckBox } from "grommet"

class CheckBoxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = { checked: !!props.checked }     
    }

    onChange = e => this.setState({ checked: e.target.checked, name: e.target.name })
    
    render() {
        const { checked } = this.state
        
        return (
            <Box
                key={this.props.id}
                direction="row"
                fill={false}
                flex={false}
                width="50%"
                margin={{ vertical: "5px" }}
            >
                <CheckBox
                    checked={checked}
                    id={this.props.label}
                    name={this.props.label}
                    onChange={this.onChange}
                    {...this.props}
                />
            </Box>
        )
    }
}

export default CheckBoxGroup