import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {
  getHorrorMovies,
  getPopularMovies,
  getPopularTV,
  getThrillerMovies,
  getUpcomingMovies,
} from '../hooks/services';
import {IMAGE_URL_PREFIX_PATH} from '../hooks/Const';
import List from '../components/List';
import Loader from '../components/Loader';
import Error from '../components/Error';
import NavBar from '../components/NavBar';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getThrillerMovies(),
      getHorrorMovies(),
    ]);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          thrillerMoviesData,
          horrorMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie =>
            moviesImagesArray.push(IMAGE_URL_PREFIX_PATH + movie.poster_path),
          );
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setThrillerMovies(thrillerMoviesData);
          setHorrorMovies(horrorMoviesData);
        },
      )
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && error && <Error />}
      {!loading && !error && (
        <>
          {moviesImages?.length > 0 && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 2.25}
                dotStyle={styles.sliderStyle}
                resizeMode="stretch"
                onPress={() => navigation.navigate('Detail')}
              />
            </View>
          )}
          {popularMovies?.length > 0 && (
            <View style={styles.carousel}>
              <List
                title="Popular Movies"
                content={popularMovies}
                navigation={navigation}
              />
            </View>
          )}
          {popularTv?.length > 0 && (
            <View style={styles.carousel}>
              <List
                title="Popular TV Shows"
                content={popularTv}
                navigation={navigation}
              />
            </View>
          )}
          {thrillerMovies?.length > 0 && (
            <View style={styles.carousel}>
              <List
                title="Thriller Movies"
                content={thrillerMovies}
                navigation={navigation}
              />
            </View>
          )}
          {horrorMovies?.length > 0 && (
            <View style={styles.carousel}>
              <List
                title="Horror Movies"
                content={horrorMovies}
                navigation={navigation}
              />
            </View>
          )}
        </>
      )}
      <NavBar navigation={navigation} main={true} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
    width: 0,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default Home;
