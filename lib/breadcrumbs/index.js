import Link from "next/link"
import { withRouter } from 'next/router'
import { Box } from "grommet"

// TODO: PUsh props.title to breadcrumbs --- use nav.js as reference

const Breadcrumbs = (props) => {
    const { router } = props
    return (        
        <Box 
            flex={false}
            responsive={true}
            direction="row"
            pad={{ vertical: "10px", horizontal: "0" }}
            fill={false}
            alignContent="center"            
        >                
            <Link href="/">
                <a>Dashboard</a>
            </Link>
            {/* <Text margin={{ horizontal: "8px" }}>/</Text>
            <Link href="/" passHref>
                <a>Previous Submissions</a>
            </Link> */}

            <style jsx>{`
                a {
                    color: black;
                    text-decoration: none;
                    transition: color 0.3s ease-in-out;
                }
                a:hover{
                    color: #D0011B;
                }
            `}</style>
        </Box>
    )
}

export default withRouter(Breadcrumbs)
