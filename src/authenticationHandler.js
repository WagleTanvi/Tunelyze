import {authorize, refresh} from 'react-native-app-auth';
import SpotifyWebAPI from 'spotify-web-api-js';
import axios from 'axios';

const getSpotifyCredentials = async () => {
  const res = await axios.get('http://localhost:3000/authenticate');
  const spotifyCredentials = res.data;
  return spotifyCredentials;
};

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

  async onLogin() {
    try {
      // const res = await getSpotifyCredentials();
      // this.spotifyAuthConfig.clientId = res.clientId;
      // this.spotifyAuthConfig.clientSecret = res.clientSecret;
      // this.spotifyAuthConfig.redirectUrl = res.redirectUrl;
      //console.log(this.spotifyAuthConfig);
      const result = await authorize(this.spotifyAuthConfig);
      console.log(result);
      //const accessToken = result.accessToken;
      // var sp = new SpotifyWebAPI();
      // await sp.setAccessToken(accessToken);
      // const {id: userId} = await sp.getMe();
      // console.log(userId);
      // const {items: playlists} = await sp.getPlaylistTracks(
      //   '6vZlk6M1TgxMyJf7gGQ29I',
      //   {limit: 50},
      // );
      // console.log(playlists);
      // console.log(playlists[0].track.preview_url);
      // const track = new Sound(playlists[12].track.preview_url, null, e => {
      //   if (e) {
      //     console.log('error loading track:', e);
      //   } else {
      //     track.play();
      //     setTimeout(() => {
      //       track.pause();
      //     }, 5000);
      //   }
      // });
      //alert(JSON.stringify(result));
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
      return error;
    }
  }

  async refreshLogin(refreshToken) {
    // const res = await getSpotifyCredentials();
    // this.spotifyAuthConfig.clientId = res.clientId;
    // this.spotifyAuthConfig.clientSecret = res.clientSecret;
    // this.spotifyAuthConfig.redirectUrl = res.redirectUrl;
    //console.log('refresh');
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    //console.log(result);
    return result;
  }
}

const authHandler = new AuthenticationHandler();
export default authHandler;
