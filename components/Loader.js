import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
const LoadingImage = require('../assets/loading.gif');

const dimensions = Dimensions.get('screen');

const Loader = () => {
  return (
    <View style={styles.loader}>
      <Image resizeMode="cover" style={styles.image} source={LoadingImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.width,
    height: dimensions.height,
  },
  image: {
    width: dimensions.width,
    height: dimensions.height / 2,
    marginTop: -(dimensions.height / 12),
  },
});

export default Loader;
