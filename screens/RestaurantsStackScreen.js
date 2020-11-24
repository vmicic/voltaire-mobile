import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RestaurantScreen from './RestaurantScreen';
import RestaurantsScreen from './RestaurantsScreen';
import MenuItemScreen from './MenuItemScreen';

export default function RestaurantsStackScreen() {
  [resturants, setRestaurants] = useState([
    { key: '1', name: 'La fresh', description: 'Best pizza', address: 'Brace Ribnikar 10' },
    { key: '2', name: 'Sef', description: 'Best sendwichees', address: 'Brace Ribnikar 3' },
    { key: '3', name: 'Kao nekad', description: 'Best cooked meals', address: 'Danila Kisa 4' }
  ])

  const RestaurantsStack = createStackNavigator();

  return (
    <RestaurantsStack.Navigator>
      <RestaurantsStack.Screen name="Restaurants" component={RestaurantsScreen} />
      <RestaurantsStack.Screen name="Restaurant" component={RestaurantScreen} />
      <RestaurantsStack.Screen name="MenuItem" component={MenuItemScreen} />
    </RestaurantsStack.Navigator>
  );
}
