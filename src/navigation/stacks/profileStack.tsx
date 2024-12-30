import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParams, ProfileStackParamsList } from '../types';
import ProfileScreen from 'screens/profile/ProfileScreen';
import EditProfileScreen from 'screens/profile/EditProfile';
import CreateProfileScreen from 'screens/profile/CreateProfileScreen';
import OtherProfileScreen from 'screens/profile/OtherProfiles';


const Stack = createStackNavigator<ProfileStackParamsList>();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ProfileStackParams.Profile} component={ProfileScreen} />
    <Stack.Screen name={ProfileStackParams.EditProfile} component={EditProfileScreen} />

    <Stack.Screen name={ProfileStackParams.CreateProfile} component={CreateProfileScreen} />
    <Stack.Screen name={ProfileStackParams.OtherProfile} component={OtherProfileScreen} />
  </Stack.Navigator>
);

export default ProfileStack;