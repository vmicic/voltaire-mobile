import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';

import RestaurantScreen from './RestaurantScreen';
import RestaurantsScreen from './RestaurantsScreen';
import MenuItemScreen from './MenuItemScreen';
import CheckoutScreen from './CheckoutScreen';
import MyHeader from '../components/MyHeader';

export default function RestaurantsStackScreen({}) {
  const RestaurantsStack = createStackNavigator();

  return (
    <RestaurantsStack.Navigator>
      <RestaurantsStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantsStack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{headerShown: false}}
      />
      <RestaurantsStack.Screen name="Menu Item" component={MenuItemScreen} />
      <RestaurantsStack.Screen name="Checkout" component={CheckoutScreen} />
    </RestaurantsStack.Navigator>
  );
}
