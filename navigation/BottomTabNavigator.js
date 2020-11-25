import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ProfileScreen from '../screens/ProfileScreen';
import RestaurantsStackScreen from '../screens/RestaurantsStackScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

export default function BottomTabNavigator() {

  const getTabBarVisibility = (route) => {
    let routeName = getFocusedRouteNameFromRoute(route);

    if(routeName === 'Restaurant') {
      return false;
    }

    if(routeName === 'Menu Item') {
      return false;
    }

    return true;
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Restaurants') {
              iconName = focused ? 'md-restaurant' : 'md-restaurant-outline';
            } else if (route.name === 'Profile') {
              iconName = 'md-person-circle-sharp';
            }

            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: '#2196f3',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsStackScreen}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route)
          })}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Order details" component={OrderDetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};