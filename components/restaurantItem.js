import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function RestaurantItem({restaurant}) {
  return (
    <View style={styles.restaurantItem}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text>{restaurant.description}</Text>
      <Text>{restaurant.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantItem: {
    padding: 16,
    marginTop: 16,
    borderColor: '#e0deda',
    borderWidth: 1,
    borderRadius: 10,
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
});
