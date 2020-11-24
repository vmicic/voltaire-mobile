import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MenuItem from '../components/MenuItem';

export default function RestaurantScreen({ route, navigation }) {
  [restaurantWithMenuItems, setRestaurantWithMenuItems] = useState(
    {
      key: '1', name: 'La Fresh', address: 'Brace Ribnikar 3', openingTime: '09:00', closingTime: '20:00', menuItems: [
        { key: '1', name: 'Cheeseburger', price: '200.0', description: 'Best cheesburger' },
        { key: '2', name: 'Burrito', price: '150.0', description: 'Best Burrito' },
        { key: '3', name: 'Pizza', price: '200.0', description: 'Best pizza' },
        { key: '4', name: 'Pizza', price: '200.0', description: 'Best pizza' },
        { key: '5', name: 'Pizza', price: '200.0', description: 'Best pizza' }]
    }
  )

  const { restaurantId } = route.params;

  return (
    <View style={styles.restaurantContainer}>
      <View style={styles.restaurantDetailsContainer}>
        <Text style={styles.restaurantName}>{restaurantWithMenuItems.name}</Text>
        <Text> {restaurantWithMenuItems.address}</Text>
        <Text>Working hours: {restaurantWithMenuItems.openingTime}:{restaurantWithMenuItems.closingTime}</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurantWithMenuItems.menuItems}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Menu Item', {menuItem: item})}>
              <MenuItem menuItem={item} />
            </TouchableOpacity>
          )} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'aqua',
  },
  restaurantDetailsContainer: {
    backgroundColor: '#f08080',
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10
  },
  menuItemsContainer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fafad2'
  }
});