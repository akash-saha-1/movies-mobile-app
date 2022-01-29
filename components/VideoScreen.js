import React from 'react';
import VideoPlayer from 'react-native-video-controls';
const demovideo = require('./../assets/oceans.mp4');

const VideoScreen = ({onClose}) => {
  return (
    <VideoPlayer
      //source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      source={demovideo}
      fullscreenOrientation="all"
      onBack={onClose}
      onEnd={onClose}
    />
  );
};

export default VideoScreen;
