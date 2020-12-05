import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import * as axios from 'axios';
import { ActivityIndicator } from 'react-native';

import MenuItem from '../components/MenuItem';
import useOrder from '../custom_hooks/useOrder';

export default function RestaurantScreen({ route, navigation }) {
  [checkoutButtonVisible, setCheckoutButtonVisible] = useState(false);
  [orderPrice, setOrderPrice] = useState(0);
  [restaurantWithMenuItems, setRestaurantWithMenuItems] = useState({});
  [loading, setLoading] = useState(false);
  order = useOrder();

  const { restaurantId } = route.params;
  const getRestaurantUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants/' + restaurantId;

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    calculateOrderPrice();
  }, [order]);

  useEffect(() => {
    navigation.setOptions({
      title: restaurantWithMenuItems.name,
    });
  }, [navigation, restaurantWithMenuItems.name]);

  const getRestaurant = () => {
    axios.get(getRestaurantUrl)
      .then(response => {
        setRestaurantWithMenuItems(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching a single restaurants")
        console.log(error);
      })
  }

  axios.interceptors.request.use(
    async config => {
      const token = await getIdToken();
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    error => {
      return Promise.reject(error)
    }
  );

  const getIdToken = async () => {
    try {
      const idToken = await AsyncStorage.getItem('@idToken')
      if (idToken === null) {
        return undefined;
      }
      return idToken;
    } catch (e) {
      console.log("Error with reading refresh token from navigation");
      console.log(e);
    }
  }

  const calculateOrderPrice = async () => {
    if (order.orderItems === undefined) {
      setCheckoutButtonVisible(false);
      return;
    } 

    console.log("RestaurantsScreen: Order exists, calculating order price");

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
                <TouchableOpacity onPress={() => navigation.navigate('Menu Item', { menuItem: item, restaurantId: restaurantWithMenuItems.id })}>
                  <MenuItem menuItem={item} />
                </TouchableOpacity>
              )} />
          </View>
          {checkoutButtonVisible && <View style={styles.buttonContainer}>
            <Button
              title={"Go to checkout (" + orderPrice + " RSD)"}
              onPress={() => { navigation.navigate("Checkout") }}
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