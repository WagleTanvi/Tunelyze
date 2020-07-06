import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base';
import {RFPercentage} from 'react-native-responsive-fontsize';

function EvaluateAnswer(props) {
  console.log('Answer');
  const [message, setMessage] = useState('Congrats!');
  const [icons, setIcons] = useState([]);
  const [count, setCount] = useState(0);
  function getMessage() {
    if (props.currentSongInfo == null) {
      console.log('ehy');
      props.currentSongInfo.songInput = '';
      props.currentSongInfo.artistInput = '';
      return;
    }
    console.log(props.currentSongInfo);
    Icon.loadFont();
    var iconsArr = [];
    var count = 0;
    for (evaluate of props.currentSongInfo.correct) {
      if (evaluate == false) {
        var thisIcon = <Icon name="times" size={RFPercentage(5)} color="red" />;
        iconsArr.push(thisIcon);
        count++;
      } else {
        var thisIcon = (
          <Icon name="check" size={RFPercentage(5)} color="green" />
        );
        iconsArr.push(thisIcon);
      }
    }
    if (count == 2) {
      setMessage('Oops!');
    } else if (count == 1) {
      setMessage('Almost There!');
    }
    setCount(count);
    setIcons(iconsArr);
  }
  useEffect(() => {
    getMessage();
  }, []);
  function tryAgain() {
    if (message === 'Oops!' || message === 'Almost There!') {
      return (
        <TouchableOpacity style={styles.button2} onPress={props.toggle}>
          <Text style={styles.howToPlay}>Try Again</Text>
        </TouchableOpacity>
      );
    } else {
      return;
    }
  }
  var song = props.currentSongInfo.songInput;
  var artist = props.currentSongInfo.artistInput;
  if (props.currentSongInfo.songInput === '') {
    song = 'No Input';
  }
  if (props.currentSongInfo.artistInput === '') {
    artist = 'No Input';
  }
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: RFPercentage(3),
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            flex: 1,
          }}>
          {message}
        </Text>
        <Card
          style={{
            flex: 4,
            shadowOpacity: 0.7,
            backgroundColor: 'rgba(255,102,153,1)',
          }}>
          <Grid style={{flex: 4, flexDirection: 'row'}}>
            <Col
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#A0A0A0',
                borderTopWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 2,
              }}>
              {icons.map((element, index) => {
                return (
                  <Row
                    key={index}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    {element}
                  </Row>
                );
              })}
            </Col>
            <Col
              style={{
                flex: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#A0A0A0',
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 2,
              }}>
              <Row
                style={{
                  flex: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#A0A0A0',
                  width: '100%',
                }}>
                <Text style={styles.text}>{song}</Text>
              </Row>
              <Row
                style={{
                  flex: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.text}>{artist}</Text>
              </Row>
            </Col>
          </Grid>
        </Card>
        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
          <TouchableOpacity
            style={styles.button1}
            onPress={async () => {
              if (props.currentSongInfo.url != null) {
                props.currentSongInfo.url.stop();
              }
              props.toggle();
              props.nextScreen(count);
              if (props.songNum == 5) {
                props.navigate.navigate('ScoreBoard');
              } else {
                props.navigate.push('Quiz');
              }
            }}>
            <Text style={styles.howToPlay}>Next</Text>
          </TouchableOpacity>
          {tryAgain()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    //width: '100%',
    height: '30%',
  },
  container: {
    flex: 1,
    width: '100%',
    //backgroundColor: 'rgba(153,153,153,1)',
  },
  button2: {
    height: '80%',
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgba(153,153,153,1)',
    borderRadius: 9,
    shadowOpacity: 0.5,
    flex: 3,
    marginHorizontal: 5,
  },
  button1: {
    height: '80%',
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgba(105,156,252,1)',
    borderRadius: 9,
    shadowOpacity: 0.5,
    flex: 3,
    marginHorizontal: 5,
  },
  howToPlay: {
    //fontFamily: 'amaranth-regular',
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
  },
});

export default EvaluateAnswer;
