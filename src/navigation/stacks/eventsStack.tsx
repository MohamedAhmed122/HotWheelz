/* eslint-disable react/react-in-jsx-scope */

import {createStackNavigator} from '@react-navigation/stack';
import {EventsStackParams, EventsStackParamsList} from '../types';
import EventsListScreen from 'screens/events/EventsList';
import EventDetailsScreen from 'screens/events/EventDetails';
import CreateEvents from 'screens/events/CreateEvent';

const Stack = createStackNavigator<EventsStackParamsList>();

const EventsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name={EventsStackParams.EventsList}
      component={EventsListScreen}
    />
    <Stack.Screen
      name={EventsStackParams.EventDetails}
      component={EventDetailsScreen}
    />
    <Stack.Screen
      options={{headerShown: true, title: 'Create Events', headerBackTitle: ''}}
      name={EventsStackParams.CreateEvents}
      component={CreateEvents}
    />
  </Stack.Navigator>
);

export default EventsStack;
