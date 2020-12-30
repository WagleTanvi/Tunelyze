import {authorize, refresh} from 'react-native-app-auth';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      usePKCE: true,
      clientId: 'dd62ca126120401ea65ea6a77d96ef56',
      redirectUrl: 'com.Tunelyze:/oauthredirect',
      scopes: ['user-read-private', 'user-read-email', 'playlist-read-private'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  /* When user does not have client access or refresh tokens */
  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      console.log(result);
      return result;
    } catch (error) {
      //await analytics().logEvent('authorize_error', JSON.stringify(error));
      console.log(JSON.stringify(error));
      return 'error';
    }
  }

  /* When user has refresh but not access token */ 
  async refreshLogin(refreshToken) {
    /* Send in refresh token parameter that was recieved from store */
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    //console.log(result);
    return result;
  }
}

const authHandler = new AuthenticationHandler();
export default authHandler;
