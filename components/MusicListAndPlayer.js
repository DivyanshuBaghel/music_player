import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

export default class MusicListAndPlayer extends Component {
  state = {
    soundFiles: [],
    isPlaying: false,
    currentSound: 0,
    soundObject: null,
    song: "",
  };

  async componentDidMount() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const assets = await MediaLibrary.getAssetsAsync({
        first: 1000,
        mediaType: "audio",
        mimeTypes: ["audio/mpeg"],
      });
      const updatedArray = assets.assets.map((item, index) => {
        return { ...item, ids: index };
      });

      alert(JSON.stringify(updatedArray));
      this.setState({ soundFiles: updatedArray });
    }
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(
      this.state.soundFiles.find((item) => item.ids === this.state.currentSound)
    );
    this.setState({ soundObject });

    const { filename } = this.state.soundFiles.find(
      (item) => item.ids === this.state.currentSound
    );
    this.setState({ song: filename });
  }

  playSound = async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(
        this.state.soundFiles.find(
          (item) => item.ids === this.state.currentSound
        )
      );
      this.setState({ soundObject });
      await soundObject.playAsync();
      this.setState({ isPlaying: true });
      
      const { filename } = this.state.soundFiles.find(
        (item) => item.ids === this.state.currentSound
      );
      this.setState({ song: filename });
    } catch (error) {
      console.log(error);
    }
  };
  playSelectedSound = (val) => {
    this.stopSound();
    this.setState({ currentSound: val, soundObject: null }, () => {
      this.playSound();
      const { filename } = this.state.soundFiles.find(
        (item) => item.ids === this.state.currentSound
      );
      this.setState({ song: filename });
    });
  };

  stopSound = async () => {
    try {
      await this.state.soundObject.stopAsync();
      this.setState({ isPlaying: false });
    } catch (error) {
      console.log(error);
    }
  };

  playNextSound = async () => {
    try {
      await this.state.soundObject.stopAsync();
      this.setState((prevState) => ({
        currentSound:
          (prevState.currentSound + 1) % this.state.soundFiles.length,
        soundObject: null,
      }));
      this.playSound();
    } catch (error) {
      console.log(error);
    }
  };

  playPreviousSound = async () => {
    try {
      await this.state.soundObject.stopAsync();
      this.setState((prevState) => ({
        currentSound:
          (prevState.currentSound - 1 + this.state.soundFiles.length) %
          this.state.soundFiles.length,
        soundObject: null,
      }));
      this.playSound();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.list}>
          {this.state.soundFiles.map((file) => (
            <React.Fragment key={file.ids}>
              <TouchableOpacity
                style={styles.btn}
                title="Play"
                onPress={() => this.playSelectedSound(file.ids)}
              >
                <Text style={styles.btnText}>{file.filename}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.song}</Text>
          </View>
          <View style={styles.btns}>
            <Button
              style={styles.btnP}
              title="Previous"
              onPress={this.playPreviousSound}
            />
            {this.state.isPlaying ? (
              <Button
                style={styles.btnP}
                title="Stop"
                onPress={this.stopSound}
              />
            ) : (
              <Button
                style={styles.btnP}
                title="Play"
                onPress={this.playSound}
              />
            )}
            <Button
              style={styles.btnP}
              title="Next"
              onPress={this.playNextSound}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  footer: {
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnText:{
    fontSize:16,
  },
  btn: {
    fontSize: 60,
    padding: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  btnP: {
    fontSize: 30,
    margin: 10,
  },
  textContainer:{
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10,
  },
  text: {
    fontSize:20,
  },
});
