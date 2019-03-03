import { withApollo } from "react-apollo"
import { Box, Image } from "grommet"
import Authentication from "../../lib/auth/msal-auth"

const ReturnMutation = ({ client }) => {    
    const auth = new Authentication()

    return (
        <Box
            height="125px"
            pad="12px"
            align="center"
            justify="center"
        >
          <Image src="../../static/progress-logo.svg" fit="contain" alignSelf="center" style={{ maxHeight: "100%"}} />
        </Box>
    )
}

export default withApollo(ReturnMutation)