import React, {Component, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';

function GenreRow(props) {
  console.log(props);
  return (
    <Row style={{margin: 10}}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Playlist')}
        style={{flex: 1}}>
        <Card
          style={{
            flex: 1,
            borderRadius: 5,
            shadowOpacity: 1,
          }}>
          <CardItem cardBody style={{flex: 5}}>
            <Image
              source={{
                uri: props.image,
              }}
              style={{height: 100, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem style={{backgroundColor: 'rgba(153,153,153,0.5)', flex: 1}}>
            <Body style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {props.name}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </Row>
  );
}
export default connect()(GenreRow);
