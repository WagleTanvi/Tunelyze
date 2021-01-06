import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setOnboarding} from '../../redux/authenticationSlice';
import {connect} from 'react-redux';
Icon.loadFont();
function WalkthroughOne(props) {
  var Skip;
  if (props.first) {
    Skip = (
      <View
        style={{
          justifyContent: 'center',
          //backgroundColor: 'red',
          width: '100%',
          flex: 0.3,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            marginEnd: '5%',
            backgroundColor: 'rgba(105,156,252,1)',
            padding: '2%',
            borderRadius: 5,
          }}
          onPress={() => {
            props.setOnboarding(true);
          }}>
          <Text
            style={{
              fontFamily: 'Acme',
              color: 'rgba(255,255,255,1)',
              //width: '90%',
              fontSize: RFPercentage(2.7),
            }}>
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.tunelyze}>TUNELYZE</Text>
      <Text style={styles.analyzeTheTune}>Analyze the Tune!</Text>
      <View style={styles.group3}>
        <View style={styles.first}>
          <View style={styles.groupRow}>
            <View style={styles.group}>
              <View style={styles.rect}>
                <Text style={styles.one}>1</Text>
              </View>
            </View>
            <Text style={styles.descrip}>
              Sign in to your Premium Spotify Account
            </Text>
          </View>
        </View>
        <View style={styles.second}>
          <View style={styles.groupRow}>
            <View style={styles.group}>
              <View style={styles.rect}>
                <Text style={styles.one}>2</Text>
              </View>
            </View>
            <Text style={styles.descrip}>Pick a Genre/Playlist</Text>
          </View>
        </View>
        <View style={styles.third}>
          <View style={styles.groupRow}>
            <View style={styles.group}>
              <View style={styles.rect}>
                <Text style={styles.one}>3</Text>
              </View>
            </View>
            <Text style={styles.descrip}>Listen and Play</Text>
          </View>
        </View>
      </View>
      <Icon name="music" style={styles.icon} />
      {Skip}
      <View style={styles.endWrapperFiller} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(74,144,226,1)',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  endWrapperFiller: {
    flex: 0.5,
  },
  analyzeTheTune: {
    //paddingTop: '3%',
    //backgroundColor: 'purple',
    fontFamily: 'Acme',
    color: 'rgba(255,255,255,1)',
    width: '100%',
    fontSize: RFPercentage(4),
    textAlign: 'center',
    flex: 1,
    fontStyle: 'italic',
  },
  tunelyze: {
    marginTop: '10%',
    //backgroundColor: 'green',
    width: '100%',
    flex: 1,
    // fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(8),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  group3: {
    //Horizontal: '20%',
    width: '82%',
    //height: 216,
    justifyContent: 'center',
    flex: 2.5,
    alignItems: 'center',
    //paddingVertical: '8%',
    borderRadius: 10,
    //borderWidth: 2,
    //borderColor: 'white',
    backgroundColor: 'rgba(105,156,252,1)',
  },
  first: {
    flex: 2,
    flexDirection: 'row',
  },
  group: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'purple',
  },
  rect: {
    width: '50%',
    height: '65%',
    backgroundColor: 'rgba(255,102,153,1)',
    borderRadius: 16,
  },
  one: {
    fontFamily: 'Acme',
    // fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(5),
    textAlign: 'center',
    marginTop: 9,
  },
  groupRow: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '2%',
    //backgroundColor: 'red',
  },
  second: {
    flex: 2,
    flexDirection: 'row',
  },
  descrip: {
    fontFamily: 'Acme',
    color: 'rgba(255,255,255,1)',
    //width: '90%',
    fontSize: RFPercentage(3),
    flex: 4,
    fontWeight: 'bold',
  },
  third: {
    flex: 2,
    //marginBottom: 19,
    flexDirection: 'row',
  },
  icon: {
    paddingTop: '10%',
    color: 'rgba(255,255,255,1)',
    fontSize: RFPercentage(15),
    flex: 1.0,
  },
});
const mapStateToProps = state => {
  return {
    onboarding: state.authentication.onboarding,
  };
};
const mapDispatchToProps = {
  setOnboarding,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalkthroughOne);
