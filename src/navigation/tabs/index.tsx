import React, {memo} from 'react';

import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EventsStack from 'navigation/stacks/eventsStack';
import ProfileStack from 'navigation/stacks/profileStack';
import ChatStack from 'navigation/stacks/chatStack';
import MapStack from 'navigation/stacks/mapStack';
import {COLORS} from 'styles';

const Tab = AnimatedTabBarNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.quicksilver,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
          height: 70,
          paddingBottom: 10,
        },
      }}
      appearance={{
        shadow: true,
        floating: true,
        whenActiveShow: TabElementDisplayOptions.BOTH,
      }}>
      <Tab.Screen
        name="Events"
        component={EventsStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              name="event"
              size={24}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              name="person"
              size={24}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              name="chat"
              size={24}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              name="map"
              size={24}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default memo(AppNavigator);
