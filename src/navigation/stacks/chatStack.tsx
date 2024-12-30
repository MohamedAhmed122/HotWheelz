import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatStackParams, ChatStackParamsList} from '../types';
import ChatListScreen from 'screens/chat/chatListScreen';
import ChatRoomScreen from 'screens/chat/chatRoomScreen';

const Stack = createStackNavigator<ChatStackParamsList>();

const ChatStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ChatStackParams.ChatList} component={ChatListScreen} />
    <Stack.Screen name={ChatStackParams.ChatRoom} component={ChatRoomScreen} />
  </Stack.Navigator>
);

export default ChatStack;
