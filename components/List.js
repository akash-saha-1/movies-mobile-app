import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const propTypes = {
  title: PropTypes.string,
  item: PropTypes.array,
};

class List extends PureComponent {
  state = {};

  render() {
    const {title, content, navigation} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card item={item} navigation={navigation} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.midnightblue,
    paddingBottom: 10,
    textAlign: 'center',
  },
});

List.propTypes = propTypes;

export default List;
