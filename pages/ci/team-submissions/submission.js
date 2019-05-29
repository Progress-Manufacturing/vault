import { Component } from 'react';
import { withRouter } from 'next/router';
import { ApolloConsumer } from 'react-apollo';

import Main from '../../../lib/layout/main';
import SubmissionProgress from '../../../components/progress';
import UserSubmission from '../../../components/usersubmission';

import Authentication from '../../../lib/auth/msal-auth';

class Submission extends Component {
  state = { 
    users: []
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const graphUrl = 'https://graph.microsoft.com/v1.0';
    const auth = new Authentication();

    try {      
      const token = await auth.getToken();
      const users = await auth.callMSGraph(false, token, `${graphUrl}/users?$orderby=displayName`);
      let allUsers = [{id: null, displayName: 'No Lead', }];
      for (let user of users.value) {
        if (user.officeLocation === null && user.id != 'd8f5843d-53a4-4374-9e2d-29044b3dd9f8' && user.id != '1b92df1b-450e-43cb-a0c7-1b4b12e9d291') {
          allUsers.push(user);
        }
      }
      
      this.setState({
        users: allUsers
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { router, user, isSupervisor, isLead, isAdmin } = this.props;
    const { users } = this.state;
    const submissionId = parseInt(router.query.id);
    
    return (
      <ApolloConsumer>
        {client => (
          <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>
            <SubmissionProgress id={submissionId} isAdmin={isAdmin} />
            <UserSubmission 
              id={submissionId}
              currentUserOid={user.oid}
              users={users}
              isAdmin={isAdmin}
              isLead={isLead}
              isSupervisor={isSupervisor}
            />
          </Main>  
        )}
      </ApolloConsumer>
    )
  }
}

export default withRouter(Submission)