import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function MusicPlayer(props) {
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(false);
 
  
  async function playSound() {
    try {  
      console.log('Loading Sound');
      console.log(props.uri)
      const { sound } = await Audio.Sound.createAsync( { uri : props.uri},{shouldPlay:true});
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function stopSound() {
    try {
      await sound.stopAsync();
      setIsPlaying(false);
      console.log('Stoped sound')
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text>{props.name}</Text>
      {isPlaying ? (
        <Button title="Stop" onPress={stopSound} />
      ) : (
        <Button title="Play" onPress={playSound} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    marginBottom:10,
    borderRadius:10,
  },
});

