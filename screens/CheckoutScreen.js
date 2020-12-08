import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import OrderItem from '../components/OrderItem';
import Error from '../components/Error';
import ApiService from '../api/ApiService';

export default function CheckoutScreen({route, navigation}) {
  const [orderPrice, setOrderPrice] = useState(0);
  const [createOrderError, setCreateOrderError] = useState(false);

  const {order} = route.params;

  useEffect(() => {
    setOrderPrice(global.price);
  }, []);

  const confirmOrder = () => {
    console.log(JSON.stringify(order));
    ApiService.orders
      .create(order)
      .then(() => {
        navigation.navigate('Restaurants');
      })
      .catch((error) => {
        setCreateOrderError(true);
      });
  };

  return (
    <View style={styles.checkoutContainer}>
      {createOrderError ? (
        <Error errorText="Error confirming order." />
      ) : (
        <View style={styles.placeholderContainer}>
          <View style={styles.orderItemsContainer}>
            <FlatList
              data={order.orderItems}
              keyExtractor={(item) => item.menuItemId}
              renderItem={({item}) => <OrderItem orderItem={item} />}
            />
          </View>
          <View style={styles.priceButtonContainer}>
            <View style={styles.priceContainer}>
              <Text>Total price: </Text>
              <Text>{orderPrice} RSD</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Confirm order" onPress={confirmOrder} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutContainer: {
    flex: 1,
    backgroundColor: '#edf0ee',
  },
  placeholderContainer: {
    flex: 1,
  },
  orderItemsContainer: {
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  priceButtonContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  priceContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 20,
  },
});
