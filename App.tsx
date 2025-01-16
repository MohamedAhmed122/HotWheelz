import {NavigationContainer} from '@react-navigation/native';
import {useAppInit} from 'hooks/useAppInit';
import AuthStack from 'navigation/stacks/authStack';
import AppNavigator from 'navigation/tabs';
import {useEffect} from 'react';
import {getTodaysMapEvents} from 'service/mapEvents/get-mapEvents';
import useStore from 'store';

const App = () => {
  const {isAuthenticated} = useStore();
  useAppInit();

  const handle = async () => {
    const {data, error} = await getTodaysMapEvents();
    console.log('data:', JSON.stringify(data.length));
    console.log('error:', JSON.stringify(error));
  };

  useEffect(() => {
    handle();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;

// TODO:
// today
// 1- finish the new Authentication system
// 2-  Add To Favorite
// 4-  other profile
// 3- Finish Chat UI
// mohamed_ahmed19@gmail.com
