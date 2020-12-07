import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

import MenuItem from '../components/MenuItem';
import ApiService from '../api/ApiService';

export default function RestaurantScreen({ route, navigation }) {
  [checkoutButtonVisible, setCheckoutButtonVisible] = useState(false);
  [orderPrice, setOrderPrice] = useState(0);
  [restaurantWithMenuItems, setRestaurantWithMenuItems] = useState({});
  [loading, setLoading] = useState(true);
  [order, setOrder] = useState({
    restaurantId: "",
    orderItems: []
  });

  const { restaurantId } = route.params;
  const getRestaurantUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants/' + restaurantId;

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    calculateOrderPrice();
  }, [order.orderItems]);

  useEffect(() => {
    navigation.setOptions({
      title: restaurantWithMenuItems.name,
    });
  }, [navigation, restaurantWithMenuItems.name]);


  const getRestaurant = () => {
    ApiService.restaurants.getRestaurant(restaurantId)
      .then(response => {
        setRestaurantWithMenuItems(response.data)
        var newOrder = { ...order, restaurantId: restaurantWithMenuItems.id }
        setOrder(newOrder);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching a single restaurants")
        console.log(error);
      })
  }

  const addToOrder = (orderItem) => {
    var orderItemsNew = order.orderItems.slice();
    orderItemsNew.push(orderItem);
    var newOrder = { ...order, orderItems: orderItemsNew };
    setOrder(newOrder);
  }

  const calculateOrderPrice = async () => {
    if (order.orderItems.length === 0) {
      setCheckoutButtonVisible(false);
      return;
    }

    price = order.orderItems.reduce(
      (accumulatedPrice, currentValue) => accumulatedPrice + currentValue.price * currentValue.quantity, 0
    );

    setOrderPrice(price);
    global.price = price;
    setCheckoutButtonVisible(true);
  }

  return (
    <View style={styles.contentContainer}>
      {loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
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
                <TouchableOpacity onPress={() => navigation.navigate('Menu Item', { menuItem: item, addToOrder: addToOrder })}>
                  <MenuItem menuItem={item} />
                </TouchableOpacity>
              )} />
          </View>
          {checkoutButtonVisible && <View style={styles.buttonContainer}>
            <Button
              title={"Go to checkout (" + orderPrice + " RSD)"}
              onPress={() => { navigation.navigate("Checkout", { order: order }) }}
            />
          </View>}
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1
  },
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