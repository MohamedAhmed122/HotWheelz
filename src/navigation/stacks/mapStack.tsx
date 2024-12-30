import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MapStackParams, MapStackParamsList} from '../types';
import MapScreen from 'screens/map/MapScreen';

const Stack = createStackNavigator<MapStackParamsList>();

const MapStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={MapStackParams.Map} component={MapScreen} />
  </Stack.Navigator>
);

export default MapStack;
