/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParams, AuthStackParamsList} from '../types';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';

const Stack = createStackNavigator<AuthStackParamsList>();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={AuthStackParams.Login} component={LoginScreen} />
      <Stack.Screen
        name={AuthStackParams.Register}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
