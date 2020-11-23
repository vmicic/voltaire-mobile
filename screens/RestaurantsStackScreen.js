import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import RestaurantItem from '../components/restaurantItem'
import RestaurantScreen from './RestaurantScreen';
import RestaurantsScreen from './RestaurantsScreen';

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
    </RestaurantsStack.Navigator>

    //   <View style={styles.container}>
    //     <View style={styles.header}>
    //       <Text style={styles.headerText}>
    //         Restaurants
    //       </Text>
    //     </View>
    //     <View style={styles.content}>
    //       <FlatList
    //         data={resturants}
    //         renderItem={({ item }) => (
    //           <RestaurantItem item={item}/>
    //         )} />
    //     </View>
    //   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'yellow',
  },
  header: {
    paddingTop: 10,
    backgroundColor: 'white'
  },
  headerText: {
    paddingBottom: 10,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  }
});