import * as Msal from 'msal';

export default class Authentication {
  constructor() {
    const redirectUri = 'http://localhost:3000/auth/return';

    this.applicationConfig = {
        clientID: 'a83306f2-cfd1-4699-aec1-33ac5f7ef7ec',
        graphScopes: ['openid', 'user.read']
    };
    this.app = typeof window === 'undefined' ? null : new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      'https://login.microsoftonline.com/common',
      () => {
        // callback for login redirect
      },
      {
        redirectUri: redirectUri,
        cacheLocation: 'localStorage',
        navigateToLoginRequestUrl: false
      }
    );
  }

  login = async () => {
    try {
          const idToken = await this.app.loginPopup(this.applicationConfig.graphScopes);
          // console.log("access_token:" + idToken);
          if (idToken) {
              return idToken;
          }
          else {
              return null;
          }
      }
      catch (e) {
          return null;
      }
  };

  logout = () => {
    this.app.logout();
  };
  
  getToken = async () => {
    try {
      const accessToken = await this.app.acquireTokenSilent(this.applicationConfig.graphScopes);
      return accessToken
    }
    catch (error) {
      try {
        const accessToken_1 = await this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
        return accessToken_1
      }
      catch (err) {
        console.error(err)
      }
    }
  };

  acquireUserTokenSilent = (user) => {
    const auth_token = this.app.acquireTokenSilent(this.applicationConfig.graphScopes, 'https://login.microsoftonline.com/common', user).then((token) => {
    return { newIdToken: token, error: null }
    }).catch((error) => {
      return { newIdToken: null, error: error }
    });

    return auth_token;
  }



  // getAccessToken = () => {
  //  return this.app.user.accessToken;
  // }

  getUser = () => {
    return this.app.getUser();
  }

}