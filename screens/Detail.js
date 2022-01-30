import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import Loader from '../components/Loader';
import {IMAGE_URL_PREFIX_PATH} from '../hooks/Const';
import {getMovieDetail, getTvDetail} from '../hooks/services';
import PlayButton from '../components/PlayButton';
import VideoScreen from '../components/VideoScreen';
import NavBar from '../components/NavBar';
import Colors from '../theme/Colors';
const placeholderImage = require('./../assets/images/placeholder.png');

const dimension = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModaVisible] = useState(false);
  const {isMovie, movieId} = route.params;

  useEffect(() => {
    setLoaded(false);
    if (isMovie) {
      getMovieDetail(movieId)
        .then(movieData => {
          setMovieDetail(movieData);
        })
        .finally(() => setLoaded(true));
    } else {
      getTvDetail(movieId)
        .then(tvData => {
          setMovieDetail(tvData);
        })
        .finally(() => setLoaded(true));
    }
  }, []);

  const showVideo = () => {
    setModaVisible(!modalVisible);
  };

  return (
    <>
      {!loaded && <Loader />}
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {uri: IMAGE_URL_PREFIX_PATH + movieDetail.poster_path}
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton showVideo={showVideo} />
              </View>
              <Text style={styles.movieTitle}>
                {isMovie ? movieDetail.title : movieDetail.name}
              </Text>
              {movieDetail.genres?.length > 0 && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(gen => (
                    <Text key={gen.id} style={styles.genreText}>
                      {gen.name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                disabled={true}
                fullStarColor={Colors.gold}
                starSize={30}
                style={styles.rating}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {isMovie
                  ? `Release Date: ${dateFormat(
                      movieDetail.release_date,
                      'dS mmmm, yyyy',
                    )}`
                  : `First Episode Date: ${dateFormat(
                      movieDetail.first_air_date,
                      'dS mmmm, yyyy',
                    )}`}
              </Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            visible={modalVisible}
            statusBarTranslucent={true}
            supportedOrientations={['portrait', 'landscape']}>
            <View style={styles.videoModal}>
              <VideoScreen onClose={showVideo} />
            </View>
          </Modal>

          {/* this is at the last beacuse touchable opacity on press does not work normally in postion absolute. so after last placement it will be on  top of the dom in terms of positioning */}
          <NavBar navigation={navigation} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    height: dimension.height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  genreText: {
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  rating: {
    paddingHorizontal: 20,
  },
  overview: {
    padding: 10,
  },
  releaseDate: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flexGrow: 1,
    width: Dimensions.width,
    height: Dimensions.height,
  },
});

export default Detail;
