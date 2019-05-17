import { withApollo } from 'react-apollo'
import { Button, Box } from 'grommet'
import { Windows } from 'grommet-icons'
import redirect from '../../lib/auth/redirect'
import jsCookie from 'js-cookie'
import gql from 'graphql-tag'
import Authentication from '../../lib/auth/msal-auth'
import jwt from 'jsonwebtoken'


const LoginButton = ({ client }) => {
    const auth = new Authentication();
    const [userToken, setUserToken] = React.useState(
        typeof window !== 'undefined' ? localStorage.getItem('msal.idtoken') : null
    );

    const handleLogClick = async () => {
        auth.login();
    }

    // console.log('decoded: ', jwt.decode(userToken));

    const loggedIn = async () => {
        const loggedIn = await client.mutate({ 
            variables: {
                msalToken: userToken,
            },
            mutation: gql`
                mutation loginUser($msalToken: String!) {
                    login(msalToken: $msalToken) {
                        token
                    }
                }
            `
        })

        return { loggedIn }
    }

    if(userToken !== null) {
        loggedIn();
        loggedIn().then(async (res) => {
            client.cache.reset().then(() => {
                redirect({}, '/')
            });
        }).catch((err) => {
            console.info('error: ', err);
        });
    }

    return (
        <Box>
            <Button 
                id='LoginButton'
                color='#5558AF'
                plain={true}
                label='Sign in with Microsoft'
                icon={<Windows size='20px' color='white' />}
                round='5px'
                style={{
                    backgroundColor: '#5558AF',
                    display: 'flex',
                    alignItems: 'center',
                    justyifyContent: 'center',
                    textDecoration: 'none',
                    padding: '15px 25px',
                    borderRadius: '4px',
                    color: 'white'
                }}
                onClick={ () => { handleLogClick() }}
            />
        </Box>
    )
}

export default withApollo(LoginButton)