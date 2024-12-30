import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'navigation/tabs';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
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
