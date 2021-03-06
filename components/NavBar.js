import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const dimensions = Dimensions.get('window');

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

const NavBar = ({navigation, main}) => {
  const [orientation, setOrientation] = useState('portrait');
  const [scWidth, setScWidth] = useState(dimensions.width);
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    setScWidth(dim.width);
    return dim.height >= dim.width;
  };

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });

    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  return (
    <>
      {main ? (
        <View style={styles.headerStyle}>
          {/* <Image
              style={styles.logo}
              source={require('../assets/movies-icon.png')}
            /> */}
          <View style={{...styles.mainNav, width: scWidth}}>
            <EntypoIcon
              name="medium"
              size={30}
              color={`${Colors.primaryBlue}`}
              style={styles.mLogo}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Icon name="search-outline" size={35} color={`${Colors.blue}`} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'chevron-back'} size={40} color={Colors.danger} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.transperant,
    zIndex: 1,
    position: 'absolute',
    top: 5,
    left: 2,
    borderBottomWidth: 0,
    elevation: 1,
    width: 50,
    height: 50,
    borderWidth: 0,
    shadowOpacity: 0,
    shadowColor: Colors.transperant,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: Colors.lightGray,
  },
  mainNav: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: Colors.transperant,
    height: 50,
    paddingRight: 15,
  },
  mLogo: {
    marginTop: -4,
  },
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
