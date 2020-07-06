import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  setSongNum,
  setTotalScore,
  setSongInArray,
  setSongArray,
  setValueOfSong,
  setSelectedPlaylist,
} from '../redux/gameSlice';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import spotifyReq from './spotifyRequests';
import {Picker} from '@react-native-community/picker';
import {Button} from 'native-base';
import {RFPercentage} from 'react-native-responsive-fontsize';
function PlaylistPicker(props) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelected] = useState();
  async function getPlaylists() {
    var resp;
    console.log(props.id);
    if (props.id === null || props.id == undefined) {
      console.log('yeet');
      resp = await spotifyReq.getUserPlaylists();
    } else {
      resp = await spotifyReq.getPlaylists(props.id);
    }
    const mid = Math.round(resp.length / 2 - 1);
    console.log(mid);
    setPlaylists(resp);
    setSelected(resp[mid].id);
  }

  useEffect(() => {
    getPlaylists();
  }, []);
  return (
    <View style={styles.content}>
      <Text
        style={{
          flex: 1,
          fontSize: RFPercentage(4),
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Choose a Playlist:
      </Text>
      <View
        style={{
          //height: 400,
          //height: '100%',
          width: '100%',
          flex: 4,
          //backgroundColor: '#CCCCCC',
        }}>
        <Picker
          selectedValue={selectedPlaylist}
          style={{
            //height: 400,
            justifyContent: 'center',
            //borderColor: 'black',
            //borderWidth: 2,
            height: '100%',
            width: '100%',
            //backgroundColor: '#CCCCCC',
          }}
          itemStyle={{fontSize: RFPercentage(3), margin: '2%'}}
          onValueChange={(itemValue, itemIndex) => {
            setSelected(itemValue);
            console.log(selectedPlaylist);
          }}>
          {playlists.map((element, index) => {
            //console.log(selectedPlaylist);
            return (
              <Picker.Item
                key={element.id}
                label={element.name}
                value={element.id}
              />
            );
          })}
        </Picker>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            var selected;
            for (playlist of playlists) {
              if (playlist.id == selectedPlaylist) {
                selected = playlist;
              }
            }
            props.setSelectedPlaylist(selected.name);
            props.navigate.push('Quiz', {
              id: selected.id,
              name: selected.name,
              limit: selected.limit,
            });
            props.toggle();
          }}>
          <Text style={styles.howToPlay}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={props.toggle}>
          <Text style={styles.howToPlay}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: '50%',
  },
  button2: {
    //height: 27,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgba(153,153,153,1)',
    borderRadius: 9,
    shadowOpacity: 0.5,
    paddingHorizontal: 30,
    margin: 10,
  },
  button1: {
    //height: 27,
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgba(105,156,252,1)',
    borderRadius: 9,
    shadowOpacity: 0.5,
    paddingHorizontal: 30,
    margin: 10,
  },
  howToPlay: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    playlistSelected: state.game.playlistSelected,
  };
};
const mapDispatchToProps = {
  setSelectedPlaylist,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistPicker);
