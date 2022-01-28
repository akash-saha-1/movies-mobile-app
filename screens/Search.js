import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Error from '../components/Error';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import {searchMovieTv} from '../hooks/services';
import Colors from '../theme/Colors';

const dimensions = Dimensions.get('screen');

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSearch = ({navigation}) => {
    if (text?.length > 0) {
      setLoading(true);
      setError(false);
      Promise.all([searchMovieTv(text, 'movie'), searchMovieTv(text, 'tv')])
        .then(([movies, tvs]) => {
          movies = movies.filter(
            mov => !!mov.release_date && mov.release_date !== '',
          );
          const data = [...movies, ...tvs];
          if (data?.length > 0) {
            setSearchResults(data.filter(item => item.poster_path?.length > 0));
          } else {
            setSearchResults([]);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    } else {
      return;
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <SafeAreaView>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={text}
              placeholder="Search Movie or TV Show"
              onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={onSearch}>
              <Icon
                name="search-outline"
                size={40}
                color={Colors.primaryBlue}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchItem}>
            {/* search items results */}
            {searchResults?.length > 0 && (
              <FlatList
                numColumns={3}
                data={searchResults}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Card navigation={navigation} item={item} />
                )}
              />
            )}

            {/* when search but no results */}
            {searchResults?.length === 0 && (
              <View style={[styles.empty, {paadingTop: 20}]}>
                <Text style={styles.mediumText}>
                  No results matching your criteria.
                </Text>
                <Text style={styles.mediumText}>Try different keywords.</Text>
              </View>
            )}

            {/* when nothing is searched */}
            {!searchResults && (
              <View style={styles.empty}>
                <Text>Type something to start searching...</Text>
              </View>
            )}
          </View>

          {/* When Error */}
          {error && <Error />}
        </SafeAreaView>
      )}
      {/* this is at the last beacuse touchable opacity on press does not work normally in postion absolute. so after last placement it will be on  top of the dom in terms of positioning */}
      <NavBar navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    marginRight: 5,
  },
  container: {
    padding: 10,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  searchItem: {
    padding: 5,
  },
  empty: {
    paddingHorizontal: 10,
  },
  mediumText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Search;
