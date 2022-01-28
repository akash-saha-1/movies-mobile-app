import React, {PureComponent} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './../screens/Home';
import Detail from './../screens/Detail';
import NavBar from './NavBar';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

class MainNavigation extends PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true} />
            ),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            //header: ({navigation}) => <NavBar navigation={navigation} />,
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            //header: ({navigation}) => <NavBar navigation={navigation} />,
            headerTransparent: true,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
