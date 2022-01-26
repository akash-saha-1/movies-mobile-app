import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Oops! Something went wrong.',
  errorText2: 'Make sure you are online and restart the App.',
};

const Error = ({errorText1, errorText2}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorText1}</Text>
      <Text style={styles.text}>{errorText2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.height - dimensions.height / 15,
    width: dimensions.width,
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 18,
  },
});

Error.propTypes = propTypes;

Error.defaultProps = defaultProps;

export default Error;
