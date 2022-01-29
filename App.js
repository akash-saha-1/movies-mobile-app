import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './components/MainNavigation';
import FullScreen from './FullScreen';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

//ignore warning logs during development
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  useEffect(() => {
    FullScreen.enable();
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer style={styles.parentContainer}>
      <MainNavigation />
    </NavigationContainer>
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
