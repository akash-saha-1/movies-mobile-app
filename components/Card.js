import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {IMAGE_URL_PREFIX_PATH} from '../hooks/Const';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};

class Card extends PureComponent {
  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('Detail', {
            isMovie: !!item.release_date,
            movieId: item.id,
          })
        }>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: IMAGE_URL_PREFIX_PATH + item.poster_path}
              : placeholderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 5,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    top: 15,
    paddingHorizontal: 2,
    width: '100%',
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;

export default Card;
