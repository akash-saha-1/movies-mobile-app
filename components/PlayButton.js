import React, {PureComponent} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/Colors';

class PlayButton extends PureComponent {
  render() {
    const {showVideo} = this.props;
    return (
      <Pressable onPress={showVideo} style={styles.button}>
        <Icon name={'caret-forward-outline'} size={30} color={Colors.white} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    paddingLeft: 4,
    backgroundColor: Colors.primaryBlue,
  },
});

export default PlayButton;
