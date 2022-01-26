import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './screens/Home';

const App = () => {
  return (
    <View style={styles.parentContainer}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
