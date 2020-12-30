import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {setSelectedPlaylist} from '../redux/gameSlice';
import {connect} from 'react-redux';
import spotifyReq from '../model/spotifyRequests';
import {SearchBar, ListItem} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';

function SearchPlaylist(props) {
  const [playlistsData, setPlaylists] = useState([]);
  const [filteredPlaylist, setFiltered] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  async function getPlaylists() {
    setLoading(true);
    var resp;
    console.log(props.id);
    if (props.id === null || props.id == undefined) {
      console.log('yeet');
      resp = await spotifyReq.getUserPlaylists();
    } else {
      console.log('something went wrong');
    }
    setPlaylists(resp);
    setFiltered(resp);
    console.log(resp);
    setLoading(false);
  }
  var List = (
    <FlatList
      data={filteredPlaylist}
      extraData={filteredPlaylist}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            console.log(item);
            props.setSelectedPlaylist(item.name);
            props.navigate.push('Quiz', {
              id: item.id,
              name: item.name,
              limit: item.limit,
            });
            props.toggle();
          }}>
          <ListItem
            containerStyle={{
              backgroundColor: 'rgba(255,102,153,1)',
              alignItems: 'center',
              margin: '1%',
              borderRadius: 10,
              justifyContent: 'center',
            }}
            bottomDivider
            title={item.name}
            titleStyle={{color: 'white', textAlign: 'center', opacity: 1}}
          />
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
  if (loading) {
    List = (
      <ActivityIndicator
        animating={loading}
        color="#bc2b78"
        size="large"
        style={{marginTop: '10%'}}
      />
    );
  }
  useEffect(() => {
    getPlaylists();
  }, []);

  function filterSearch(search) {
    setFiltered(
      playlistsData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setSearch(search);
    console.log(search);
  }
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
          borderColor: '#CCCCCC',
          borderWidth: 1,
          //   backgroundColor: '#CCCCCC',
        }}>
        <SearchBar
          lightTheme={true}
          placeholder="Search Playlist..."
          value={search}
          onChangeText={filterSearch}
        />
        {List}
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <TouchableOpacity style={styles.button2} onPress={props.toggle}>
          <Text style={styles.howToPlay}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContent: {
    backgroundColor: 'white',
  },
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
)(SearchPlaylist);
