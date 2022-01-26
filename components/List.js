import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  item: PropTypes.object,
};

class List extends PureComponent {
  state = {};

  render() {
    const {title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => <Card item={item} />}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 10,
    textAlign: 'center',
  },
});

List.propTypes = propTypes;

export default List;
