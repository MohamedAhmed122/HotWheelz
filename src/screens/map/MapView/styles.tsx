import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');
export default StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapCard: {
    top: height > 700 ? '70%' : '65%',
    marginLeft: '3%',
  },
});
