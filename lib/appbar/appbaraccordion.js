import { Component } from "react"
import Link from "next/link"
import { withRouter } from 'next/router'
import { Box, Button, Collapsible } from "grommet"

class AppBarAccordion extends Component {
    state = { open: false }
    render() {
        const { open } = this.state
        // TODO: setup active states and keep reports/admin area open
        const { router } = this.props
        return (
            <Box>
                <Box
                    height="50px"
                    direction="row"
                    fill="horizontal"
                    flex={{ grow: 0, shrink: 0 }}
                >
                    <Button 
                        className="AccordionButton"
                        icon={this.props.icon} 
                        label={this.props.label} 
                        onClick={() => this.setState({ open: !open })}
                        focusIndicator={false}
                        alignSelf="start"
                        hoverIndicator
                        plain
                        fill
                    />
                </Box>
                <Collapsible open={open} {...this.props}>    
                    {(this.props.submenu).map(subitem => (
                        <Box
                            key={subitem.id}
                            direction="row"
                            fill="horizontal"
                            flex={true}
                            style={{
                                minHeight: "40px"
                            }}
                        >
                            <Link href={subitem.link}>
                                <a>{subitem.label}</a>
                            </Link>                            
                        </Box>
                    ))}
                </Collapsible>
                <style jsx>{`
                    a {
                        width: 100%;
                        padding: 0 20px 0 52px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        text-decoration: none;
                        color: white;
                        background: transparent;
                        transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
                    }
                    a:hover {
                        background: #545454;
                    }
                `}</style>
            </Box>
        )
    }
}


export default withRouter(AppBarAccordion)