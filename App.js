import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MusicListAndPlayer from './components/MusicListAndPlayer';
import Constants from 'expo-constants';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.lebel}>Music</Text>
      </View>
      <MusicListAndPlayer/>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:Constants.statusBarHeight,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor:'black'
    
  },
  textContainer:{
    
  },
  lebel:{
    fontSize:54,
    marginLeft:8,
    color:"lightblue",
  }
});
