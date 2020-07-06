import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import authHandler from './authenticationHandler';
import {connect} from 'react-redux';

import {
  setAccessToken,
  setRefreshToken,
  setSigingIn,
} from './redux/authenticationSlice';
class LoginScreen extends Component {
  state = {};
  render() {
    return (
      <View>
        <Button
          title="Press to login"
          onPress={async () => {
            console.log(this.props);
            if (
              this.props.authentication.refreshToken == null ||
              this.props.authentication.accessToken == null
            ) {
              const authenticationObject = await authHandler.onLogin();
              this.props.setAccessToken({
                accessToken: authenticationObject.accessToken,
              });
              this.props.setRefreshToken({
                refreshToken: authenticationObject.refreshToken,
              });
              console.log(this.props);
              console.log(this.props.authentication.refreshToken);
            } else {
              alert('You are already logged in');
            }
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = {setAccessToken, setRefreshToken, setSigingIn};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
