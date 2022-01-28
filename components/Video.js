import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({onClose}) => {
  return (
    <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      fullscreenOrientation="all"
      onBack={onClose}
      onEnd={onClose}
    />
  );
};

export default Video;
