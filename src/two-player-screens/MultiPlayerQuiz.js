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
  import spotifyReq from '../model/spotifyRequests';
  import EvaluateAnswer from '../screens/EvaulateAnswer';
  import Modal from 'react-native-modal';
  import {RFPercentage} from 'react-native-responsive-fontsize';
  import QuitModal from '../screens/QuitModal';
  import {compareTwoStrings} from 'string-similarity';
  import Svg, { Circle, Text as SvgText } from "react-native-svg";



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
  
  function MultiPlayerQuiz(props) {
    const [selectedTime, setTime] = useState(10);
    const [currentTimeout, setCurrentTimeout] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [quitModalVisible, setQuitModal] = useState(false);
    //const [evaluation, setEvaluation] = useState([]);
    const [activityLoading, setActivityLoading] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const toggleQuitModal = () => {
      setQuitModal(!quitModalVisible);
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
      //getTracks();
  
      // cleanup function
      return () => {

      };
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
  
    return (
        <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background.jpg')}
          resizeMode="stretch"
          style={styles.image1}>
          <Modal isVisible={activityLoading}>
            <ActivityIndicator
              animating={activityLoading}
              color="#bc2b78"
              size="large"
            />
          </Modal>
          <Text
            style={{
              color: 'white',
              fontSize: RFPercentage(5),
              marginVertical: 20,
              fontWeight: 'bold',
            }}>
                MY PLAYLIST
            {/* {props.playlistSelected} */}
          </Text>
          <View style={styles.headerBox}>
            <View style={styles.rect1}>
                <Text style={styles.songNumText}>Song {props.songNum}/5 <Text  style={styles.time}> - {selectedTime} secs</Text> </Text>
            </View>
            <View style={styles.rect2}>
                <Text style={styles.scoreText}>{props.score}</Text>
            </View>
        </View>
        <TouchableOpacity
          style={styles.playSongButton}
          onPress={() =>{
            
          }}>
          <Text style={styles.buttonText}>Play Song</Text>
        </TouchableOpacity>
        <View style={styles.circleContainer}>
           <TouchableOpacity style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
            <Svg height="100%" width="100%" style={{shadowOpacity: 1}}>
                <Circle cx="50%" cy="50%" r="45%" fill="white" />
                <Circle cx="50%" cy="50%" r="35%" fill="rgba(255,102,153,1)" />
                <SvgText fill="white" stroke="white" fontSize="40" x="50%" y="50%" textAnchor="middle">Click!</SvgText>
            </Svg>
            </TouchableOpacity>
            </View>
        <TouchableOpacity
          style={styles.skipSongButton}
          onPress={() =>{
            
          }}>
          <Text style={styles.buttonText}>Skip Song</Text>
        </TouchableOpacity>
        </ImageBackground>
        {/* // <Modal isVisible={isModalVisible}>
        //   <EvaluateAnswer
        //     //evaluation={evaluation}
        //     songNum={props.songNum}
        //     currentSongInfo={
        //       props.songNum != 6
        //         ? props.songs[props.songNum - 1]
        //         : {songInput: '', artistInput: ''}
        //     }
        //     toggle={toggleModal}
        //     navigate={props.navigation}
        //     nextScreen={prepareForNextScreen}
        //   />
        // </Modal> */}
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
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image1: {
      flex: 1,
      alignItems: 'center',
    },
    headerBox: {
      flex: 1,
      width: '90%',
      backgroundColor: 'rgba(255,255,255,1)',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      shadowOpacity: 0.7,
      marginBottom: '5%'
    },
    rect1: {
      height: '70%',
      backgroundColor: 'rgba(255,102,153,1)',
      borderRadius: 10,
      marginHorizontal: '2%',
      flex: 4,
      justifyContent: 'center',
    },
    rect2: {
        backgroundColor: 'rgba(105,156,252,1)',
        borderRadius: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        marginHorizontal: '2%',
    },
    songNumText: {
      //fontFamily: 'roboto-regular',
      color: 'rgba(255,255,255,1)',
      fontSize: RFPercentage(3.5),
      textAlign: 'left',
      fontWeight: 'bold',
      marginStart: '5%'
    },
    scoreText: {
        color: 'rgba(255,255,255,1)',
        textAlign: 'center',
        fontSize: RFPercentage(3.5),
    },
    time: {
        //fontFamily: 'roboto-regular',
        color: 'rgba(255,255,255,1)',
        fontSize: RFPercentage(3),
        textAlign: 'left',
        fontWeight: 'bold',
        marginStart: '5%',
        fontStyle: 'italic'
      },
    timeText: {
      //fontFamily: 'roboto-regular',
      color: 'rgba(255,255,255,1)',
      textAlign: 'center',
      fontSize: RFPercentage(2.5),
    },
    skipSongButton: {
        marginBottom: '10%',
        flex: 0.7,
        backgroundColor: 'rgba(255,102,153,1)',
        borderRadius: 9,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    playSongButton: {
      marginBottom: '3%',
      flex: 1,
      backgroundColor: 'rgba(13,60,98,1)',
      borderRadius: 9,
      shadowOpacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
  },
    buttonText: {
      //fontFamily: 'amaranth-regular',
      color: 'rgba(255,255,255,1)',
      fontSize: RFPercentage(3),
      textAlign: 'center',
    },
    buzzerText: {
      //fontFamily: 'amaranth-regular',
      color: 'rgba(255,255,255,1)',
      fontSize: RFPercentage(6),
      textAlign: 'center',
    },
    circleContainer: {
        width: '80%',
        flex: 4,
        //backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
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
  )(MultiPlayerQuiz);
  