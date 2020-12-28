import React, {
  Component,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import Sound from 'react-native-sound';
import {
  setSongNum,
  setTotalScore,
  setSongInArray,
  setSongArray,
  setValueOfSong,
  setSelectedPlaylist,
} from '../redux/gameSlice';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import spotifyReq from './spotifyRequests';
import EvaluateAnswer from './EvaulateAnswer';
import Modal from 'react-native-modal';
import {Tooltip} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import QuitModal from './QuitModal';
import {compareTwoStrings} from 'string-similarity';
const times = ['1', '5', '10', '20', '30'];
Sound.setCategory('Playback');
const evaluateSong = (input, correct) => {
  if (input == null) {
    return false;
  }
  //console.log('Evaluate');
  // console.log(input.toLowerCase());
  // console.log(correct.toLowerCase());
  var withoutParen = correct.toLowerCase().split(' (')[0];
  var withoutDash = correct.toLowerCase().split(' -')[0];
  console.log('Similar Song');
  console.log(compareTwoStrings(input.toLowerCase().trim(), withoutParen));
  console.log(
    compareTwoStrings(input.toLowerCase().trim(), correct.toLowerCase()),
  );
  console.log(compareTwoStrings(input.toLowerCase().trim(), withoutDash));
  if (
    input.toLowerCase().trim() === correct.toLowerCase() ||
    input.toLowerCase().trim() === withoutParen ||
    input.toLowerCase().trim() === withoutDash
  ) {
    return true;
  }
  if (
    compareTwoStrings(input.toLowerCase().trim(), correct.toLowerCase()) >
      0.8 ||
    compareTwoStrings(input.toLowerCase().trim(), withoutParen) > 0.8 ||
    compareTwoStrings(input.toLowerCase().trim(), withoutDash) > 0.8
  ) {
    return true;
  }
  return false;
};
const evaluateArtist = (input, correct) => {
  if (input == null) {
    return false;
  }
  for (artist of correct) {
    console.log('Similar Artist');
    console.log(compareTwoStrings(input, artist));
    // console.log(input.toLowerCase());
    // console.log(artist.toLowerCase());
    if (input.toLowerCase().trim() === artist.toLowerCase()) {
      return true;
    }
    if (
      compareTwoStrings(input.toLowerCase().trim(), artist.toLowerCase()) > 0.85
    ) {
      return true;
    }
  }
  return false;
};
// const invalidTrack = new Sound('invalid.mp3', Sound.MAIN_BUNDLE, e => {
//   if (e) {
//     error = true;
//     console.log('error loading track:', e);
//   }
// });

function Quiz(props) {
  const [selectedTime, setTime] = useState();
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [quitModalVisible, setQuitModal] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [timings, setTimingsArr] = useState([
    {label: '1', played: false},
    {label: '5', played: false},
    {label: '10', played: false},
    {label: '20', played: false},
    {label: '30', played: false},
  ]);
  //const [evaluation, setEvaluation] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleQuitModal = () => {
    setQuitModal(!quitModalVisible);
  };
  //const screen = Dimensions.get('screen');
  const _keyboardDidShow = () => {
    const {height} = Dimensions.get('screen');
    console.log('Keyboard shown');
    console.log(height);
    // if (height <= 667) {
    setKeyboard(true);
    //}
  };

  const _keyboardDidHide = () => {
    const {height} = Dimensions.get('screen');
    console.log('Keyboard Hidden');
    console.log(height);
    // if (height <= 667) {
    //   console.log('hello');
    setKeyboard(false);
    //}
  };

  const playSong = (url, seconds) => {
    if (currentTimeout != null) {
      clearTimeout(currentTimeout);
    }
    url.stop();
    const time = seconds * 500;
    // console.log('Play');
    // console.log(seconds);
    // console.log(time);
    url.play();
    setCurrentTimeout(
      setTimeout(() => {
        console.log('stop');
        url.stop();
      }, time),
    );
  };
  async function getTracks() {
    setActivityLoading(true);
    //console.log(props);
    if (props.songNum == 1) {
      //console.log(props.route.params.id);
      const resp = await spotifyReq.getTracks(
        props.route.params.id,
        props.route.params.limit,
      );
      // need to handle error
      await props.setSongArray(resp);
      //console.log(props.songs[props.songNum - 1].url);
    }
    setActivityLoading(false);
    //while (props.songs.length < 5);
    //console.log(props.songs);
    //playSong(props.songs[props.songNum - 1].url, 1);
  }
  function handleSubmit() {
    if (currentTimeout != null) {
      clearTimeout(currentTimeout);
    }
    const currentSong = props.songs[props.songNum - 1];
    if (currentSong.url != null) {
      currentSong.url.stop();
    }
    var result = [];
    //console.log(evaluateSong(currentSong.songInput, currentSong.name));
    result.push(evaluateSong(currentSong.songInput, currentSong.name));
    result.push(evaluateArtist(currentSong.artistInput, currentSong.artists));
    //console.log(result);
    props.setValueOfSong({type: 'correct', value: result});
    //setEvaluation(result);
    toggleModal();
  }
  function calculateCurrentScore(count) {
    var multiplier = 1;
    if (count == 2) {
      multiplier = 0;
    } else if (count == 0) {
      multiplier = 2;
    }
    switch (selectedTime) {
      case '1':
        return 5 * multiplier;
        break;
      case '5':
        return 4 * multiplier;
        break;
      case '10':
        return 3 * multiplier;
        break;
      case '20':
        return 2 * multiplier;
        break;
      case '30':
        return 1 * multiplier;
        break;
      default:
        return 0;
    }
  }
  function prepareForNextScreen(count) {
    props.setValueOfSong({type: 'time', value: selectedTime});
    const score = calculateCurrentScore(count);
    console.log('SCORE');
    console.log(score);
    props.setValueOfSong({type: 'score', value: score});
    const total = props.score + score;
    props.setTotalScore(total);
    const newNum = props.songNum + 1;
    props.setSongNum(newNum);
    //console.log(props);
  }
  function quit() {
    if (currentTimeout != null) {
      clearTimeout(currentTimeout);
    }
    //console.log(props.songs[props.songNum - 1]);
    // const currentSong = props.songs[props.songNum - 1];
    // if (currentSong.url != null) {
    //   currentSong.url.stop();
    // }
    props.setSongArray([]);
    props.setTotalScore(0);
    props.setSongNum(1);
    props.setSelectedPlaylist('');
    props.navigation.navigate('Home');
    // reset variables?
  }
  //const tooltipRef = useRef(null);
  useEffect(() => {
    console.log(props.playlistSelected);
    Keyboard.addListener('keyboardWillShow', _keyboardDidShow);
    Keyboard.addListener('keyboardWillHide', _keyboardDidHide);
    //tooltipRef.current.toggleTooltip();
    getTracks();

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardDidHide);
    };
    //playSong(props.songs[props.songNum - 1].url, 1);
  }, []);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setQuitModal(true);
          }}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginRight: 10,
            backgroundColor: 'rgba(13,60,98,1)',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: RFPercentage(2.5),
            }}>
            QUIT
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  function onLeftSwipe() {
    if (props.songNum <= 5) {
      const currentSong = props.songs[props.songNum - 1];
      if (currentSong.url != null) {
        currentSong.url.stop();
      }
      prepareForNextScreen(2);
      if (props.songNum == 5) {
        props.navigation.navigate('ScoreBoard');
      } else {
        props.navigation.push('Quiz');
      }
    }
  }
  function onDownSwipe() {
    Keyboard.dismiss();
  }
  return (
    <GestureRecognizer
      onSwipeLeft={onLeftSwipe}
      onSwipeDown={onDownSwipe}
      config={config}
      style={styles.container}>
      {/* <View style={styles.container}> */}
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        resizeMode="stretch"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}>
        <Modal isVisible={activityLoading}>
          <ActivityIndicator
            animating={activityLoading}
            color="#bc2b78"
            size="large"
          />
        </Modal>
        {/* <View style={{just}}> */}
        <Text
          style={{
            color: 'white',
            fontSize: RFPercentage(5),
            marginVertical: 20,
            fontWeight: 'bold',
          }}>
          {props.playlistSelected}
        </Text>
        <View style={styles.headerBox}>
          <View style={styles.rect1}>
            <View style={styles.rect2}>
              <Text style={styles.song1}>Song {props.songNum}/5</Text>
            </View>
            <View style={styles.score}>
              <View style={styles.rect3}>
                <Text style={styles.scoreText}>{props.score}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.timeBox}>
          {timings.map((element, index) => {
            //console.log(element);
            var buttonStyle;
            if (element.label == selectedTime && element.played) {
              buttonStyle = styles.timeCircleSelectDisable;
            } else if (element.label == selectedTime) {
              buttonStyle = styles.timeCircleSelect;
            } else if (element.played) {
              buttonStyle = styles.timeCircleDisable;
            } else {
              buttonStyle = styles.timeCircle;
            }
            return (
              // <View key={index} style={styles.group10}>
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => {
                  if (!element.played) {
                    setTime(element.label);
                    playSong(props.songs[props.songNum - 1].url, element.label);
                  } else {
                    console.log('already');
                    //invalidTrack.play();
                  }
                  var newTimes = timings;
                  for (arrElement of newTimes) {
                    if (parseInt(arrElement.label) < parseInt(element.label)) {
                      // console.log(parseInt(arrElement.label));
                      // console.log(parseInt(element.label));
                      arrElement.played = true;
                    }
                  }
                  newTimes[index].played = true;
                  setTimingsArr(newTimes);
                }}>
                <Text style={styles.timeText}>{element.label} s</Text>
              </TouchableOpacity>
              // </View>
            );
          })}
        </View>
        <View style={keyboard ? styles.quizBoxKeyboard : styles.quizBox}>
          <View style={styles.rect4}>
            <View style={styles.group5}>
              <View style={keyboard ? styles.rect5Keyboard : styles.rect5}>
                <View style={styles.song2Row}>
                  <Text style={styles.song2}>Song</Text>
                  <TextInput
                    placeholder="e.g. Rolling in the Deep"
                    style={styles.placeholder1}
                    onChangeText={text =>
                      props.setValueOfSong({type: 'songInput', value: text})
                    }
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.song2Row}>
                  <Text style={styles.song2}>Artist</Text>
                  <TextInput
                    placeholder="e.g. Adele"
                    style={styles.placeholder1}
                    onChangeText={text =>
                      props.setValueOfSong({type: 'artistInput', value: text})
                    }
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.rect7} onPress={handleSubmit}>
                    <Text style={styles.submit1}>Submit</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={
                    keyboard
                      ? styles.endWrapperFillerKeyboard
                      : styles.endWrapperFiller
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Modal isVisible={isModalVisible}>
        <EvaluateAnswer
          //evaluation={evaluation}
          songNum={props.songNum}
          currentSongInfo={
            props.songNum != 6
              ? props.songs[props.songNum - 1]
              : {songInput: '', artistInput: ''}
          }
          toggle={toggleModal}
          navigate={props.navigation}
          nextScreen={prepareForNextScreen}
        />
      </Modal>
      <Modal
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
        isVisible={quitModalVisible}
        onBackdropPress={() => {
          setQuitModal();
        }}>
        <QuitModal
          toggle={toggleQuitModal}
          navigate={props.navigation}
          quitFunction={quit}
        />
      </Modal>

      {/* </View> */}
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  endWrapperFiller: {
    flex: 1,
  },
  endWrapperFillerKeyboard: {
    flex: 0.2,
  },
  startWrapperFiller: {
    flex: 1,
  },
  startWrapperFillerKeyboard: {
    flex: 0,
  },
  image1: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  image1_imageStyle: {},
  image2: {
    width: 270,
    marginTop: '10%',
  },
  image2Keyboard: {
    width: 270,
  },
  headerBox: {
    height: '7%',
    width: '90%',
    // backgroundColor: 'rgba(255,255,1)',
  },
  rect1: {
    //justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    // right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    shadowOpacity: 0.7,
  },
  score: {
    //width: 47,
    height: '75%',
    //flex: 1,
    flex: 1,
    marginEnd: '5%',
    // marginRight: 25,
    // marginV: 13,
  },
  rect3: {
    backgroundColor: 'rgba(105,156,252,1)',
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: RFPercentage(3.5),
  },
  rect2: {
    height: '70%',
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 18,
    marginHorizontal: '2%',
    flex: 5,
    justifyContent: 'center',
  },
  song1: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(3.5),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rect1Stack: {
    height: 74,
    marginTop: -4,
    backgroundColor: 'rgba(255,102,153,1)',
  },
  timeBox: {
    width: '90%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    // shadowOpacity: 1,
    // shadowRadius: 1,
    //backgroundColor: 'rgba(255,102,153,1)',
    //marginLeft: 25,
  },
  rect8: {
    height: 42,
    backgroundColor: 'rgba(13,60,98,1)',
    borderRadius: 100,
  },
  group10: {
    height: '100%',
    width: '100%',
    marginRight: 5,
    marginLeft: 5,
  },
  timeCircle: {
    height: '100%',
    width: '15%',
    //padding: 20,
    backgroundColor: 'rgba(13,60,98,1)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeCircleDisable: {
    height: '100%',
    width: '15%',
    backgroundColor: 'rgba(156,156,156,1)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeCircleSelect: {
    height: '100%',
    width: '15%',
    backgroundColor: 'rgba(13,60,98,1)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 4,
    borderStyle: 'dotted',
  },
  timeCircleSelectDisable: {
    height: '100%',
    width: '15%',
    backgroundColor: 'rgba(156,156,156,1)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 4,
    borderStyle: 'dotted',
  },
  timeText: {
    //fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: RFPercentage(2.7),
  },
  quizBox: {
    height: '40%',
    width: '90%',
    marginTop: '10%',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowColor: 'gray',
    //backgroundColor: 'red',
    //marginLeft: 25,
  },
  quizBoxKeyboard: {
    height: '25%',
    width: '90%',
    marginTop: '10%',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowColor: 'gray',
    //backgroundColor: 'red',
    //marginLeft: 25,
  },
  rect4: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 23,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.7,
  },
  group5: {
    width: '90%',
    height: '90%',
  },
  rect5: {
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 23,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '5%',
  },
  rect5Keyboard: {
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 23,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '5%',
  },
  song2: {
    height: '100%',
    //fontFamily: '
    paddingTop: '4%',
    color: 'rgba(255,252,252,1)',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: RFPercentage(3.5),
    flex: 2,
    fontWeight: 'bold',
    //backgroundColor: 'red',
  },
  placeholder1: {
    //fontFamily: 'roboto-regular',
    color: '#121212',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(230, 230, 230,1)',
    flex: 5,
    borderRadius: 4,
    fontSize: RFPercentage(2.5),
    //marginEnd: 10,
  },
  song2Row: {
    flex: 1.5,
    //backgroundColor: 'orange',
    //height: '25%',
    //height: 37,
    flexDirection: 'row',
    //alignItems: 'center',
    // alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 7,
    //marginTop: 10,
    //marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 7,
    marginHorizontal: 10,
  },
  rect7: {
    //height: '75%',
    width: '35%',
    backgroundColor: 'rgba(74,134,232,1)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  submit1: {
    //fontFamily: 'roboto-regular',
    fontSize: RFPercentage(3),
    color: 'rgba(241,234,234,1)',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    songs: state.game.songs,
    score: state.game.totalScore,
    songNum: state.game.songNum,
    playlistSelected: state.game.playlistSelected,
  };
};
const mapDispatchToProps = {
  setSongNum,
  setTotalScore,
  setSongInArray,
  setSongArray,
  setValueOfSong,
  setSelectedPlaylist,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
