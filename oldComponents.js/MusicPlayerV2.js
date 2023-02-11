// import React, { Component } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import {Audio} from 'expo-av';
// import * as MediaLibrary from 'expo-media-library';




// export default class MusicPlayerV2 extends Component {
//   state = {
//     soundFiles: [],
//     isPlaying: false,
//     currentSound: 0,
//     soundObject: null,
//   };

  

//   async componentDidMount() {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status === 'granted') {
//         const assets = await MediaLibrary.getAssetsAsync({
//           first: 1000,
//           mediaType:"audio",
//           mimeTypes: ['audio/mpeg'],
//         });
//         // alert(JSON.stringify(assets))
//         this.setState({ soundFiles: assets.assets });
//       }
//       const soundObject = new Audio.Sound();
//       await soundObject.loadAsync(this.state.soundFiles[this.state.currentSound]);
//       this.setState({ soundObject });
//   }
  

//    playSound = async () => {
//     try {
//       const soundObject = new Audio.Sound();
//       await soundObject.loadAsync(this.state.soundFiles[this.state.currentSound]);
//       this.setState({ soundObject });
//       await soundObject.playAsync();
//       this.setState({ isPlaying: true });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   stopSound = async () => {
//     try {
//       await this.state.soundObject.stopAsync();
//       this.setState({ isPlaying: false });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   playNextSound = async () => {
//     try {
//       await this.state.soundObject.stopAsync();
//       this.setState(prevState => ({
//         currentSound: (prevState.currentSound + 1) % this.state.soundFiles.length,
//         soundObject: null
//       }));
//       this.playSound();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   playPreviousSound = async () => {
//     try {
//       await this.state.soundObject.stopAsync();
//       this.setState(prevState => ({
//         currentSound: (prevState.currentSound - 1 + this.state.soundFiles.length) % this.state.soundFiles.length,
//         soundObject: null
//       }));
//       this.playSound();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Previous" onPress={this.playPreviousSound} />
//         {this.state.isPlaying ? (
//           <Button title="Stop" onPress={this.stopSound} />
//         ) : (
//           <Button title="Play" onPress={this.playSound} />
//         )}
//         <Button title="Next" onPress={this.playNextSound} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row'
//   },
// });
