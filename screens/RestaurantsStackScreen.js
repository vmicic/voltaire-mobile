import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import RestaurantScreen from './RestaurantScreen';
import RestaurantsScreen from './RestaurantsScreen';
import MenuItemScreen from './MenuItemScreen';
import CheckoutScreen from './CheckoutScreen';

export default function RestaurantsStackScreen({ navigation }) {

  const RestaurantsStack = createStackNavigator();

  return (
    <RestaurantsStack.Navigator>
      <RestaurantsStack.Screen name="Restaurants" component={RestaurantsScreen} />
      <RestaurantsStack.Screen name="Restaurant" component={RestaurantScreen} />
      <RestaurantsStack.Screen name="Menu Item" component={MenuItemScreen} />
      <RestaurantsStack.Screen name="Checkout" component={CheckoutScreen} />
    </RestaurantsStack.Navigator>
  );
}
