import {authorize, refresh} from 'react-native-app-auth';
import SpotifyWebAPI from 'spotify-web-api-js';
import Sound from 'react-native-sound';
import {connect} from 'react-redux';
import {store, persistor} from '../redux/store';
class SpotifyRequests {
  constructor() {
    //this.sp = new SpotifyWebAPI();
  }
  async getProfile() {
    // console.log(store.getState().authentication.accessToken);
    try {
      var sp = new SpotifyWebAPI();
      console.log('Access Token: ');
      console.log(store.getState().authentication.accessToken);
      await sp.setAccessToken(store.getState().authentication.accessToken);
      const resp = await sp.getMe();
      //console.log('Resp');
      //console.log(resp);
      return resp;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  async getGenres(genresList) {
    // console.log(store.getState().authentication.accessToken);
    var genresResp = [];
    try {
      var sp = new SpotifyWebAPI();
      //console.log(store.getState().authentication.accessToken);
      await sp.setAccessToken(store.getState().authentication.accessToken);
      for (genre of genresList) {
        const resp = await sp.getCategory(genre);
        //console.log(resp);
        var info = {
          image: resp.icons[0].url,
          name: resp.name,
          id: resp.id,
        };
        genresResp.push(info);
      }
      return genresResp;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  async getPlaylists(genreId) {
    // console.log(store.getState().authentication.accessToken);
    var playlists = [];
    try {
      var sp = new SpotifyWebAPI();
      await sp.setAccessToken(store.getState().authentication.accessToken);
      //console.log(genreId);
      const resp = await sp.getCategoryPlaylists(genreId, {
        limit: 5,
        country: 'US',
      });
      for (playlist of resp.playlists.items) {
        playlists.push({
          id: playlist.id,
          name: playlist.name,
          limit: playlist.tracks.total,
        });
      }
      console.log(playlists);
      return playlists;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  async getTracks(playlistId, limit) {
    // console.log(store.getState().authentication.accessToken);
    var tracks = [];
    try {
      var sp = new SpotifyWebAPI();
      await sp.setAccessToken(store.getState().authentication.accessToken);
      //console.log(genreId);
      var random = Math.floor(Math.random() * (limit - 10) + 1); // this number might exceed playlist length
      console.log('Random Offset: ' + random);
      const resp = await sp.getPlaylistTracks(playlistId, {
        limit: 10,
        offset: random,
        market: 'from_token',
      });
      var count = 0;
      console.log(resp.items.length);
      for (trackInfo of resp.items) {
        if (tracks.length === 5) {
          break;
        }
        var artists = [];
        for (artist of trackInfo.track.artists) {
          artists.push(artist.name);
        }
        var error = false;
        const track = new Sound(trackInfo.track.preview_url, null, e => {
          if (e) {
            error = true;
            console.log('error loading track:', e);
          }
        });
        if (!error) {
          tracks.push({
            name: trackInfo.track.name,
            artists: artists,
            url: track,
            score: 0,
            songInput: '',
            artistInput: '',
            time: '',
            correct: [],
          });
        }
      }
      if (tracks.length != 5) {
        console.log('Something went wrong. All 10 tracks are not playable');
      }
      return tracks;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async getUserPlaylists() {
    var playlists = [];
    try {
      var sp = new SpotifyWebAPI();
      await sp.setAccessToken(store.getState().authentication.accessToken);
      //console.log(genreId);
      const resp = await sp.getUserPlaylists();
      console.log(resp);
      for (playlist of resp.items) {
        playlists.push({
          id: playlist.id,
          name: playlist.name,
          limit: playlist.tracks.total,
        });
      }
      console.log(playlists);
      return playlists;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
}

const spotifyReq = new SpotifyRequests();
export default spotifyReq;
