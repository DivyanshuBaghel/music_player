import { Text, View , StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Constants from 'expo-constants';
// import MusicList from './components/MusicList'
// import MusicPlayerV2 from './components/MusicPlayerV2'
import MusicListAndPlayer from './components/MusicListAndPlayer'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Music</Text>
        <MusicListAndPlayer/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:Constants.statusBarHeight,
  },
  label:{
    fontSize:50,
  },
})
