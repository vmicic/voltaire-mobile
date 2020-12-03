import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import * as axios from 'axios';

import OrderItem from '../components/OrderItem';

export default function CheckoutScreen({ navigation }) {
  [orderPrice, setOrderPrice] = useState(0);
  [order, setOrder] = useState({});

  const postOrderUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/orders';

  useEffect(() => {
    orderSetup();
  }, []);

  useEffect(() => {
    if (order.orderItems === undefined) {
      return;
    } else {
      price = order.orderItems.reduce(
        (accumulatedPrice, currentValue) => accumulatedPrice + currentValue.price * currentValue.quantity, 0
      );

      setOrderPrice(global.price);
    }
  }, [order]);

  const orderSetup = async () => {
    let order = await getOrder();
    if (order === undefined) {
      return;
    }

    setOrder(order);
  }

  const getOrder = async () => {
    try {
      const orderJson = await AsyncStorage.getItem('@order')
      if (orderJson === null) {
        return undefined;
      }
      return JSON.parse(orderJson);
    } catch (e) {
      console.log("Error with parsing order");
    }
  }

  const confirmOrder = () => {
    console.log(JSON.stringify(order))
    axios
      .post(postOrderUrl, order)
      .then(() => {
        navigation.navigate("Restaurants");
      })
      .catch(error => {
        console.log("Error with posting order");
        console.log(error);
      })
  }

  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.orderItemsContainer}>
        <FlatList
          data={order.orderItems}
          keyExtractor={item => item.menuItemId}
          renderItem={({ item }) => (
            <OrderItem orderItem={item} />
          )}
        />
      </View>
      <View style={styles.priceButtonContainer}>
        <View style={styles.priceContainer}>
          <Text>Total price: </Text>
          <Text>{price} RSD</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm order"
            onPress={confirmOrder}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutContainer: {
    flex: 1,
    backgroundColor: '#edf0ee',
  },
  orderItemsContainer: {
    paddingBottom: 15,
    backgroundColor: 'white'
  },
  priceButtonContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  priceContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 20
  }
});