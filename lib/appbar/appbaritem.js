import Link from 'next/link'
import { withRouter } from 'next/router'
import { Box } from 'grommet'


const AppBarItem = (props) => {
    const { router } = props

    return (
        <Box 
            key={props.key}
            height='50px'
            direction='row'
            fill='horizontal'
            flex={{ grow: 0, shrink: 0 }}
        > 
            <Link href={props.link}>
                <a><span>{props.icon}</span> {props.label}</a>
            </Link>
            <style jsx>{`
                a {
                    width: 100%;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    text-decoration: none;
                    color: white;
                    background-color: ${ router.pathname === props.link ? '#F3DE8A' : '' };
                    color: ${ router.pathname === props.link ? 'black' : 'white' };
                    transition: all 0.3s ease-in-out;
                }
                a:hover {
                    background-color: #545454;
                    color: white;
                }
                a > span {
                    margin-right: 15px;
                    line-height: 0;
                }
                a :global(> span > svg.MenuIcon) {
                    stroke: ${ router.pathname === props.link ? 'black' : 'white' };
                }
                a:hover :global( > span > svg.MenuIcon) {
                    stroke: white;
                }
            `}</style>
        </Box>
    )
}

export default withRouter(AppBarItem)