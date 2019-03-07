
import React, {Component} from 'react';
import Header from './src/components/Header'
import Post from './src/components/Post'
import {StyleSheet, View} from 'react-native';


export default class App extends Component {
  render() {

    const comments = [
      {
        nickname: 'Jéssica Pacheco',
        comment: 'Minha cabeça é enorme!'
      },
      {
        nickname: 'Uriel Augusto',
        comment: 'É mesmo! heuhuehuehu'
      },
    ]

    return (
        <View style={{ flex: 1}}>
          <Header />
          <Post image={require('./assets/imgs/fence.jpg')} comments={comments}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
