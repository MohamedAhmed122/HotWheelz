import {StyleSheet, View} from 'react-native';
import MapScreen from 'screens/map/MapScreen';

const App = () => {
  return <MapScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 100 + 10,
    backgroundColor: '#ecf0f1',
  },
});

export default App;
