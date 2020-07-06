import React, {Component, useEffect, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base';
import spotifyReq from './spotifyRequests';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import PlaylistPicker from './PlaylistPicker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
const genresList = ['pop', 'rock', 'country', 'rnb', 'desi'];
Icon.loadFont();

function GenreRow(props) {
  var image = (
    <Image
      source={{
        uri: props.image,
      }}
      style={{height: '100%', width: null, flex: 1}}
    />
  );
  if (props.index === 1 && props.indexElement == 2) {
    //console.log('FIVE');
    image = (
      <Image
        source={require('../assets/images/custom2.png')}
        style={{height: '100%', width: null, flex: 1}}
      />
    );
  }
  return (
    <Row style={{margin: 10}}>
      <TouchableOpacity
        onPress={() => {
          props.press(props.id);
        }}
        style={{flex: 1}}>
        <Card
          style={{
            flex: 1,
            borderRadius: 5,
            shadowOpacity: 1,
          }}>
          <CardItem cardBody style={{flex: 5}}>
            {image}
          </CardItem>
          <CardItem style={{flex: 1}}>
            <Body style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(3),
                  //fontFamily: 'amaranth-regular',
                }}>
                {props.name}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </Row>
  );
}

function Genres(props) {
  const [genreInfo, setGenreInfo] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [selectedGenre, setSelected] = useState('');
  async function getGenres() {
    //console.log(props);
    setActivityLoading(true);
    const resp = await spotifyReq.getGenres(genresList);
    resp.push({
      name: 'Your Playlists',
      id: null,
      image: '../assets/images/ownPlaylist.jpg',
    });
    //console.log(resp);
    var newArr = [];
    while (resp.length) newArr.push(resp.splice(0, 3));
    console.log(newArr);
    setGenreInfo(newArr);
    setTimeout(function() {
      setActivityLoading(false);
    }, 500);

    //console.log(this.props);
    // setImage(resp.images[0].url);
    // setUser(resp.display_name);
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('This executes everytime screen loads');
      // clear all
      //setActivityLoading(false);
      //console.log(activityLoading);
    });
    console.log('Hello');
    getGenres();
    return unsubscribe;
  }, [props.navigation]);
  const navigate = id => {
    toggleModal();
    setSelected(id);
    //console.log(id);
    //props.navigation.navigate('Playlist', {id: id});
  };
  const toggleModal = playlist => {
    setModalVisible(!isModalVisible);
    // if (playlist) {
    //   props.navigation.navigate('Quiz', {id: playlist});
    // }
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')} />
      ),
    });
  }, [props.navigation]);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        resizeMode="stretch"
        style={styles.image}
        imageStyle={styles.image_imageStyle}>
        {/* <View style={styles.image2}>
          <View
            style={{
              //backgroundColor: 'rgba(255,102,153,1)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingHorizontal: 100,
              //paddingVertical: 10,
              borderRadius: 5,
              //opacity: 0.9,
            }}>
            <Text
              style={{
                fontSize: 28,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Genres
            </Text>
          </View>
        </View> */}
        <Modal isVisible={activityLoading}>
          <ActivityIndicator
            animating={activityLoading}
            color="#bc2b78"
            size="large"
          />
        </Modal>
        <Grid style={{marginBottom: 20}}>
          {genreInfo.map((element, index) => {
            return (
              <Col key={index}>
                {element.map((genre, indexElement) => {
                  return (
                    <GenreRow
                      key={genre.id}
                      image={genre.image}
                      name={genre.name}
                      press={navigate}
                      id={genre.id}
                      index={index}
                      indexElement={indexElement} // hardcoded
                    />
                  );
                })}
              </Col>
            );
          })}
        </Grid>
      </ImageBackground>
      <Modal isVisible={isModalVisible} onBackdropPress={() => toggleModal()}>
        <PlaylistPicker
          id={selectedGenre}
          toggle={toggleModal}
          navigate={props.navigation}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '100%',
    height: 80,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  image_imageStyle: {},
  image2: {
    width: '95%',
    height: 60,
    marginTop: 10,
    //marginBottom: 10,
    alignItems: 'center',
    //backgroundColor: 'rgba(105,156,252,1)',
    //backgroundColor: 'rgba(13,60,98,1)',
    //backgroundColor: 'rgba(255,102,153,1)',
    flexDirection: 'row',
    borderRadius: 10,
    //shadowOpacity: 1,
    justifyContent: 'center',
  },
  image3: {
    width: 200,
    height: 200,
    marginTop: 40,
    borderRadius: 100,
  },
  welcomeUser: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    height: 40,
    textAlign: 'center',
    fontSize: 40,
    marginTop: 46,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  button1: {
    height: 75,
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 9,
    shadowOpacity: 1,
    marginTop: 80,
    marginLeft: 26,
    marginRight: 25,
  },
  startListening: {
    // fontFamily: 'amaranth-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 31,
    marginRight: 31,
  },
});

export default connect()(Genres);
