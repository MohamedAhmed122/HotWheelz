/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParams, AuthStackParamsList} from '../types';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import AuthUsername from 'screens/auth/AuthUsername';
import AuthUserLocation from 'screens/auth/AuthUserLocation';
import AuthUserBio from 'screens/auth/AuthUserBio';
import AuthUserUploadPhoto from 'screens/auth/AuthUploadPhoto';

const Stack = createStackNavigator<AuthStackParamsList>();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={AuthStackParams.Register}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={AuthStackParams.AuthUploadPhoto}
        component={AuthUserUploadPhoto}
      />
      <Stack.Screen name={AuthStackParams.AuthBio} component={AuthUserBio} />
      <Stack.Screen
        name={AuthStackParams.AuthLocation}
        component={AuthUserLocation}
      />
      <Stack.Screen
        name={AuthStackParams.AuthUsername}
        component={AuthUsername}
      />
      <Stack.Screen name={AuthStackParams.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
