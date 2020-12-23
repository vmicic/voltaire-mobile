import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import OrderItem from '../components/OrderItem';
import Error from '../components/Error';
import ApiService from '../api/ApiService';
import tailwind from 'tailwind-rn';

export default function CheckoutScreen({route, navigation}) {
  const [orderPrice, setOrderPrice] = useState(0);
  const [createOrderError, setCreateOrderError] = useState(false);

  const {order} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

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
        console.log(error);
        setCreateOrderError(true);
      });
  };

  return (
    <View style={tailwind('flex-1 bg-gray-200')}>
      {createOrderError ? (
        <Error errorText="Error confirming order." />
      ) : (
        <View style={tailwind('flex-1')}>
          <View style={tailwind('bg-white')}>
            <FlatList
              data={order.orderItems}
              keyExtractor={(item) => item.menuItemId}
              renderItem={({item}) => <OrderItem orderItem={item} />}
            />
          </View>
          <View style={tailwind('flex-1 justify-between')}>
            <View
              style={tailwind('flex-row justify-between bg-white px-4 py-6')}>
              <Text>Total price: </Text>
              <Text>{orderPrice},00 RSD</Text>
            </View>
            <Pressable onPress={confirmOrder} testID="confirmOrder">
              <View style={tailwind('p-4 mb-6 bg-blue-500')}>
                <View style={tailwind('flex-row justify-center')}>
                  <Text style={tailwind('text-base text-white')}>
                    Confirm order
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
