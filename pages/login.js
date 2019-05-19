import { Button, Box } from 'grommet';
import { Windows } from 'grommet-icons';

import Authentication from '../lib/auth/msal-auth';

import Main from '../lib/layout/login';

const Login = () => {
  const auth = new Authentication();
  const handleClick = () => {
    auth.login();
  }

  return (
    <Main>
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
          onClick={ () => { handleClick() }}
        />
      </Box>
    </Main>
  )
}

export default Login