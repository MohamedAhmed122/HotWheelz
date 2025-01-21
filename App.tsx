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
// 1- edit profile => DONE
// 2- profile screen => half
// 3- navigation bottom => NOT GOING TO DO
// 4- input => DONE
// 5- finalize profile => half
// 6- isOrgaizer => DONE
// 7- add to favorite => half
// 8- Daily event => half
// 9- login screen => DONE
// 10 - other profiles => half
// 11 - fix create events
