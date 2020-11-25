import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MenuItem from '../components/MenuItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function RestaurantScreen({ route, navigation }) {
  [checkoutButtonVisible, setCheckoutButtonVisible] = useState(false);
  [orderPrice, setOrderPrice] = useState(0);
  [restaurantWithMenuItems, setRestaurantWithMenuItems] = useState(
    {
      id: '1', name: 'La Fresh', address: 'Brace Ribnikar 3', openingTime: '09:00', closingTime: '20:00', menuItems: [
        { id: '1', name: 'Cheeseburger', price: 200.0, description: 'Best cheesburger', restaurantId: '1' },
        { id: '2', name: 'Burrito', price: 150.0, description: 'Best Burrito', restaurantId: '1' },
        { id: '3', name: 'Pizza', price: 200.0, description: 'Best pizza', restaurantId: '1' },
        { id: '4', name: 'Pepperoni Pizza', price: 200.0, description: 'Worst one', restaurantId: '1' },
        { id: '5', name: 'Capricozza', price: 200.0, description: 'Best ever', restaurantId: '1' }]
    }
  )

  const { restaurantId } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    buttonSetup();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      title: restaurantWithMenuItems.name,
    });
  }, [navigation, restaurantWithMenuItems.name]);

  const getOrder = async () => {
    try {
      const orderJson = await AsyncStorage.getItem('@order')
      if (orderJson === null) {
        return undefined;
      }
      return JSON.parse(orderJson);
    } catch (e) {
      console.log("Error with async storage");
    }
  }

  const buttonSetup = async () => {

    console.log("Button setup invoked");
    let order = await getOrder();

    if (order === undefined) {
      setCheckoutButtonVisible(false);
      return;
    }

    price = 0;

    order.orderItems.forEach(orderItem => {
      price += orderItem.price * orderItem.quantity;
    });

    setOrderPrice(price);
    setCheckoutButtonVisible(true);
  }


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
      {checkoutButtonVisible && <View style={styles.buttonContainer}>
        <Button
          title={"Go to checkout (" + orderPrice + " RSD)"}
          onPress={() => {navigation.navigate("Checkout")}}
        />
      </View>}
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
  },
  buttonContainer: {
    padding: 20
  }
});