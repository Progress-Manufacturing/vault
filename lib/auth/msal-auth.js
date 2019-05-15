import * as Msal from 'msal';

export default class Authentication {
  constructor() {
    const redirectUri = process.env.URL_REDIRECT;

    this.applicationConfig = {
      auth: {
        clientId: 'a83306f2-cfd1-4699-aec1-33ac5f7ef7ec',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
      }
    }

    this.applicationScope = {
      scopes: ['openid', 'user.read', 'mail.send']
    }

    this.app = typeof window === 'undefined' ? null : new Msal.UserAgentApplication(this.applicationConfig)
  }

  acquireTokenRedirect = () => {
    //Always start with acquireTokenSilent to obtain a token in the signed in user from cache
    this.app.acquireTokenSilent(this.applicationScope).then((tokenResponse) => {
      tokenResponse;
    }).catch((error) => {
        console.log(error);
        // Upon acquireTokenSilent failure (due to consent or interaction or login required ONLY)
        // Call acquireTokenRedirect
        if (requiresInteraction(error.errorCode)) {
            this.app.acquireTokenRedirect(this.applicationScope);
        }
    });
  }

  authRedirectCallBack = (error, response) => {
    if (error) {
      console.log(error);
    } else {
        return response;
    }
  }

  requiresInteraction = (errorCode) => {
    if (!errorCode || !errorCode.length) {
        return false;
    }
    return errorCode === "consent_required" || errorCode === "interaction_required" || errorCode === "login_required";
  }

  login = () => {
    this.app.handleRedirectCallback(this.authRedirectCallBack);
    this.app.loginRedirect(this.applicationScope);

    if(this.app.getAccount() && !this.app.isCallback(window.location.hash)) {
      this.acquireTokenRedirect();
    }
  }

  logout = () => {
    this.app.logout();
  };
  
  getToken = () => {    
    return this.app.acquireTokenSilent(this.applicationScope).then((tokenResponse) => {
      return tokenResponse.accessToken;
    }).catch(err => {
      if (err.name === 'InteractionRequiredAuthError') {
        this.app.acquireTokenPopup(tokenRequest).then(response => {
          response.accessToken;
        }).catch(err => {
          console.error(err);
        })
      }
    });
  }

  // acquireUserTokenSilent = (user) => {
  //   const auth_token = this.app.acquireTokenSilent(this.applicationScope, 'https://login.microsoftonline.com/common', user).then((token) => {
  //   return { newIdToken: token, error: null }
  //   }).catch((error) => {
  //     return { newIdToken: null, error: error }
  //   });

  //   return auth_token;
  // }

  // TODO: Get access token
  // getAccessToken = () => {
  //  return this.app.user.accessToken;
  // }

  getUser = () => {
    return this.app.getUser();
  }
}