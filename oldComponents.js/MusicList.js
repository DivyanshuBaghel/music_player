import { Text, View , ScrollView ,StyleSheet,Button} from 'react-native'
import React, { Component } from 'react'
import * as MediaLibrary from 'expo-media-library';
import MusicPlayer from './MusicPlayer';
import MusicPlayerV2 from './MusicPlayerV2';
// import MusicPlayerV3 from './MusicPlayerV3';




export default class MusicList extends Component {
    state = {
        files: [],
      };
      
    
    async componentDidMount() {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const assets = await MediaLibrary.getAssetsAsync({
            first: 1000,
            mediaType:"audio",
            mimeTypes: ['audio/mpeg'],
          });
          alert(JSON.stringify(assets))
          this.setState({ files: assets.assets });
        }
    }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.list}>
        {this.state.files.map((file) => (
          <React.Fragment key={file.id}>
            <MusicPlayer uri={file.uri} name={file.filename}/>
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={styles.footer}>
          <MusicPlayerV2/>
      </View>
      {/* <MusicPlayerV3 files={this.state.files.toString()}/> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    list:{
      
    },
    footer:{
      justifyContent: "flex-end",
      marginBottom:30,
    }
})