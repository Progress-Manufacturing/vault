import { withApollo } from "react-apollo"
import { Button, Box } from "grommet"
import { Windows } from "grommet-icons"
import redirect from "../../lib/auth/redirect"
import jsCookie from "js-cookie"
import gql from "graphql-tag"
import Authentication from "../../lib/auth/msal-auth"

const LoginButton = ({ client }) => {
    const auth = new Authentication()

    const initLogin = async () => {
        auth.login().then(token => {
            if(token !== null) {
                let inThirtyDays = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                jsCookie.set("access_token", token, { expires: inThirtyDays })
            }
        }).then(() => {
            let cookieToken = jsCookie.get("access_token")

            const loggedIn = client.mutate({ 
                variables: { 
                    msalToken: cookieToken
                },
                mutation: gql`
                    mutation loginUser($msalToken: String!) {
                        login(msalToken: $msalToken) {
                            token
                        }
                    }
                `
            });
            return loggedIn
        }).then((res) => {
            let inThirtyDays = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
            jsCookie.set("token", res.data.login.token, { expires: inThirtyDays })
            client.cache.reset().then(() => {
                redirect({}, '/')
            })
        })
        // jsCookie.remove("access_token");  
        // this.auth.logout();
    }

    const handleLogClick = () => {
        initLogin();
    }

    return (
        <Box>
            <Button 
                className="LoginButton"
                color="#5558AF"
                plain={true}
                label="Signin with Microsoft"
                icon={<Windows size="20px" color="white" />}
                round="5px"
                className="LoginButton" 
                style={{ 
                    backgroundColor: "#5558AF",
                    display: "flex",
                    alignItems: "center",
                    justyifyContent: "center",
                    textDecoration: "none",
                    padding: "15px 25px",
                    borderRadius: "4px",
                    color: "white"
                }}
                onClick={ () => { handleLogClick() }}
            />
        </Box>
    )
}

export default withApollo(LoginButton)