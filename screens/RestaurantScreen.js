import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MenuItem from '../components/MenuItem';

export default function RestaurantScreen({ route, navigation }) {
  [restaurantWithMenuItems, setRestaurantWithMenuItems] = useState(
    {
      id: '1', name: 'La Fresh', address: 'Brace Ribnikar 3', openingTime: '09:00', closingTime: '20:00', menuItems: [
        { id: '1', name: 'Cheeseburger', price: '200.0', description: 'Best cheesburger', restaurantId: '1' },
        { id: '2', name: 'Burrito', price: '150.0', description: 'Best Burrito', restaurantId: '1' },
        { id: '3', name: 'Pizza', price: '200.0', description: 'Best pizza', restaurantId: '1' },
        { id: '4', name: 'Pepperoni Pizza', price: '200.0', description: 'Worst one', restaurantId: '1' },
        { id: '5', name: 'Capricozza', price: '200.0', description: 'Best ever', restaurantId: '1' }]
    }
  )

  const { restaurantId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      title: restaurantWithMenuItems.name,
    });
  }, [navigation, restaurantWithMenuItems.name]);

    return (
      <View style={styles.restaurantContainer}>
        <View style={styles.restaurantDetailsContainer}>
          <Text style={styles.restaurantName}>{restaurantWithMenuItems.name}</Text>
          <Text>{restaurantWithMenuItems.address}</Text>
          <Text>Working hours: {restaurantWithMenuItems.openingTime}:{restaurantWithMenuItems.closingTime}</Text>
        </View>
        <View style={styles.menuItemsContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={restaurantWithMenuItems.menuItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Menu Item', { menuItem: item })}>
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
      backgroundColor: 'white'
    },
    restaurantDetailsContainer: {
      padding: 20,
      backgroundColor: 'white'
    },
    restaurantName: {
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: 10
    },
    menuItemsContainer: {
      marginTop: 20,
      flex: 1,
      backgroundColor: 'white'
    }
  });