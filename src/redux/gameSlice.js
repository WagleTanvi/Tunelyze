import {createSlice} from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    songs: [],
    songNum: 1,
    totalScore: 0,
    playlistSelected: '',
  },
  reducers: {
    setSongNum(state, action) {
      state.songNum = action.payload;
    },
    setTotalScore(state, action) {
      state.totalScore = action.payload;
    },
    setSongInArray(state, action) {
      state.songs.push(action.payload.element);
    },
    setSongArray(state, action) {
      //console.log(action.payload);
      state.songs = action.payload;
    },
    setValueOfSong(state, action) {
      //console.log(action.payload.type);
      const {type, value} = action.payload;
      switch (type) {
        case 'songInput':
          state.songs[state.songNum - 1].songInput = value;
          break;
        case 'artistInput':
          state.songs[state.songNum - 1].artistInput = value;
          break;
        case 'score':
          state.songs[state.songNum - 1].score = value;
          break;
        case 'time':
          state.songs[state.songNum - 1].time = value;
          break;
        case 'correct':
          state.songs[state.songNum - 1].correct = value;
          break;
        default:
          break;
      }
      //console.log(state.songs);
    },
    setSelectedPlaylist(state, action) {
      console.log('HEY');
      console.log(action.payload);
      state.playlistSelected = action.payload;
    },
  },
});

export const {
  setSongNum,
  setTotalScore,
  setSongInArray,
  setSongArray,
  setValueOfSong,
  setSelectedPlaylist,
} = gameSlice.actions;

export default gameSlice.reducer;
