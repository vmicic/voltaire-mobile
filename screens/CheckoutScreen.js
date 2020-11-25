import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

import OrderItem from '../components/OrderItem';

export default function CheckoutScreen({ navigation }) {
  [orderPrice, setOrderPrice] = useState(0);
  [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    orderSetup();
  }, [navigation]);

  const orderSetup = async () => {
    let order = await getOrder();
    if (order !== undefined) {
      setOrderItems(order.orderItems);
    }

    price = 0;

    order.orderItems.forEach(orderItem => {
      price += orderItem.price * orderItem.quantity;
    });

    setOrderPrice(price);
  }

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

  const confirmOrder = () => {
    console.log("Confirming order");
  }

  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.orderItemsContainer}>
        <FlatList
          data={orderItems}
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
    flex:1,
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