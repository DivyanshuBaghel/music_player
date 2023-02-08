import { Text, View , ScrollView ,StyleSheet,Button} from 'react-native'
import React, { Component } from 'react'
import * as MediaLibrary from 'expo-media-library';
import MusicPlayer from './MusicPlayer';



export default class MusicList extends Component {
    state = {
        files: [],
      };
      
    
    async componentDidMount() {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const assets = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType:"audio",
            mimeTypes: ['audio/mpeg'],
          });
          alert(JSON.stringify(assets))
          this.setState({ files: assets.assets });
        }
    }
  render() {
    return (
      <ScrollView style={styles.list}>
        {this.state.files.map((file) => (
          <React.Fragment key={file.id}>
            <Text>{file.filename}</Text>
            <MusicPlayer uri = {file.uri} />
          </React.Fragment>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    list:{

    }
})