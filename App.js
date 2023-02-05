import { Text, View , StyleSheet } from 'react-native'
import React, { Component } from 'react'
import MusicList from './components/MusicList'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Music</Text>
        <MusicList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:30,
  },
  label:{
    fontSize:70,
  }
})
