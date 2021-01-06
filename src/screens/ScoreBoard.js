import React, {Component, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  setSongNum,
  setTotalScore,
  setSongArray,
  setSelectedPlaylist,
} from '../redux/gameSlice';
import {RFPercentage} from 'react-native-responsive-fontsize';
EntypoIcon.loadFont();
IoniIcon.loadFont();
function SongScoreRow(props) {
  console.log(props);
  const artist = props.element.artists.join(', ');
  var firstIcon;
  var secondIcon;
  if (props.element.correct[0] == true) {
    firstIcon = <EntypoIcon name="check" style={styles.icon} />;
  }
  if (props.element.correct[1] == true) {
    secondIcon = <EntypoIcon name="check" style={styles.icon} />;
  }
  var time = props.element.time;
  if (
    props.element.time === '' ||
    props.element.time === undefined ||
    props.element.time === null
  ) {
    console.log('YEs');
    time = '0';
  }

  return (
    <View style={styles.songBox}>
      <View style={styles.rect1}>
        <View style={styles.timeGroup}>
          <View style={styles.ellipseStack}>
            {/* <Svg viewBox="0 0 44.89 38.02" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(13,60,98,1)"
                cx={22}
                cy={19}
                rx={22}
                ry={19}
              />
            </Svg> */}
            <Text style={styles.time}>{time} s</Text>
          </View>
        </View>
        <View style={styles.songTitleGroupStack}>
          <View style={styles.songTitleGroup}>
            {firstIcon}
            <Text
              style={
                props.element.correct[0] === true
                  ? styles.songTitle
                  : styles.songTitleWrong
              }
              ellipsizeMode="tail"
              numberOfLines={1}>
              {props.element.name}
            </Text>
          </View>
          <View style={styles.songTitleGroup}>
            {secondIcon}
            <Text
              style={
                props.element.correct[1] === true
                  ? styles.songTitle
                  : styles.songTitleWrong
              }
              ellipsizeMode="tail"
              numberOfLines={1}>
              {artist}
            </Text>
          </View>
        </View>
        <View style={styles.scoreGroup}>
          <View style={styles.rect7}>
            <Text style={styles.plusScore}>+{props.element.score}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
function ScoreBoard(props) {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            props.setSongArray([]);
            props.setTotalScore(0);
            props.setSongNum(1);
            props.setSelectedPlaylist('');
            props.navigation.navigate('Home');
          }}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 3,
            marginLeft: 20,
            backgroundColor: 'rgba(13,60,98,1)',
            borderRadius: 5,
          }}>
          <IoniIcon name="md-home" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);
  return (
    // <View style={styles.container}>
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      resizeMode="stretch"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
      {/* <Image
        source={require('../assets/images/logo_name.png')}
        resizeMode="contain"
        style={styles.image2}
      /> */}
      <Text
        style={{
          color: 'white',
          fontSize: RFPercentage(5),
          //marginVertical: 20,
          fontWeight: 'bold',
        }}>
        {props.playlist}
      </Text>
      <View style={styles.topBar}>
        <View style={styles.rect}>
          <Text style={styles.finalScore}>FINAL SCORE</Text>
          <View style={styles.group}>
            <View style={styles.rect8}>
              <Text style={styles.topScore}>{props.score}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.rect5}>
          <View style={styles.allSongs}>
            {props.songs.map((element, index) => {
              return <SongScoreRow key={index} element={element} />;
            })}
          </View>
        </View>
      </View>
      <View style={styles.playAgainBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            props.setSongNum(1);
            props.setTotalScore(0);
            props.navigation.navigate('Genres');
          }}>
          <Text style={styles.playAgain}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
  },
  image_imageStyle: {},
  image2: {
    width: 310,
    height: 83,
    flex: 1,
  },
  topBar: {
    width: '100%',
    //backgroundColor: 'red',
    flex: 0.6,
    justifyContent: 'center',
  },
  rect: {
    height: '80%',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 11,
    flexDirection: 'row',
    shadowOpacity: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalScore: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,102,153,1)',
    fontSize: RFPercentage(4),
    textAlign: 'center',
    flex: 4,
    fontWeight: 'bold',
  },
  group: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect8: {
    height: '90%',
    width: '75%',
    paddingVertical: '5%',
    backgroundColor: 'rgba(74,144,226,1)',
    borderRadius: 9,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  topScore: {
    alignContent: 'flex-start',
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3),
  },
  main: {
    width: '100%',
    flex: 3,
    //backgroundColor: 'red',
    justifyContent: 'center',
  },
  rect5: {
    height: '90%',
    backgroundColor: 'rgba(255,102,153,1)',
    shadowOpacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allSongs: {
    width: '95%',
    height: '100%',
    justifyContent: 'space-between',
    //backgroundColor: 'green',
    paddingVertical: 10,
  },
  songBox: {
    height: '20%',
    alignSelf: 'stretch',
    //backgroundColor: 'red',
  },
  rect1: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    shadowOpacity: 0.7,
  },
  timeGroup: {
    flex: 1,
  },
  ellipse: {
    width: 45,
    height: 38,
    justifyContent: 'center',
  },
  time: {
    fontSize: RFPercentage(2.3),
    //fontFamily: "roboto-regular",
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
  },
  ellipseStack: {
    marginLeft: '10%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13,60,98,1)',
    width: '80%',
    borderRadius: 100,
  },
  songTitleGroup: {
    flex: 3,
    height: '2%',
    flexDirection: 'row',
    //backgroundColor: 'green',
    paddingTop: 2,
    paddingHorizontal: 10,
  },
  icon: {
    color: 'rgba(126,211,33,1)',
    fontSize: RFPercentage(3),
    flex: 1,
  },
  songTitle: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(122,218,12,1)',
    textAlign: 'center',
    flex: 5,
    fontSize: RFPercentage(2.3),
  },
  songTitleWrong: {
    // fontFamily: 'roboto-regular',
    color: 'gray',
    textAlign: 'center',
    flex: 5,
    fontSize: RFPercentage(2.3),
  },
  iconStack: {
    height: 25,
  },
  songTitleGroup1: {
    flex: 3,
    flexDirection: 'row',
  },
  icon1: {
    flex: 1,
    color: 'rgba(126,211,33,1)',
    fontSize: 22,
  },
  songTitle2: {
    flex: 5,
    // fontFamily: 'roboto-regular',
    color: 'rgba(122,218,12,1)',
    textAlign: 'center',
  },
  icon1Stack: {
    height: 25,
  },
  songTitleGroupStack: {
    height: '100%',
    flex: 4,
    flexDirection: 'column',
  },
  scoreGroup: {
    justifyContent: 'center',
    flex: 1,
  },
  rect7: {
    height: '80%',
    backgroundColor: 'rgba(126,211,33,1)',
    borderRadius: 9,
    justifyContent: 'center',
  },
  plusScore: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
  playAgainBox: {
    width: 310,
    height: 62,
    flex: 1,
  },
  button: {
    height: 62,
    backgroundColor: 'rgba(74,144,226,1)',
    borderRadius: 10,
    shadowOpacity: 0.7,
  },
  playAgain: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 9,
  },
});
const mapStateToProps = state => {
  return {
    songs: state.game.songs,
    score: state.game.totalScore,
    playlist: state.game.playlistSelected,
  };
};
const mapDispatchToProps = {
  setSongNum,
  setTotalScore,
  setSongArray,
  setSelectedPlaylist,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreBoard);
