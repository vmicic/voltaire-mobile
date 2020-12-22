import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {ActivityIndicator} from 'react-native';
import tailwind from 'tailwind-rn';

import ApiService from '../api/ApiService';
import Error from '../components/Error';
import Restaurant from '../components/Restaurant';

export default function RestaurantScreen({route, navigation}) {
  const [checkoutButtonVisible, setCheckoutButtonVisible] = useState(false);
  const [orderPrice, setOrderPrice] = useState(0);
  const [restaurantWithMenuItems, setRestaurantWithMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [restaurantRequestError, setRestaurantRequestError] = useState(false);

  const {restaurantId} = route.params;
  const [order, setOrder] = useState({
    restaurantId: restaurantId,
    orderItems: [],
  });

  useEffect(() => {
    const getRestaurant = () => {
      ApiService.restaurants
        .getRestaurant(restaurantId)
        .then((response) => {
          setRestaurantWithMenuItems(response.data);
          setLoading(false);
        })
        .catch((errorResponse) => {
          console.log('Error loading restaurant');
          setRestaurantRequestError(true);
          setLoading(false);
        });
    };

    getRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    const calculateOrderPrice = async () => {
      if (order.orderItems.length === 0) {
        setCheckoutButtonVisible(false);
        return;
      }

      const price = order.orderItems.reduce(
        (accumulatedPrice, currentValue) =>
          accumulatedPrice + currentValue.price * currentValue.quantity,
        0,
      );

      setOrderPrice(price);
      global.price = price;
      setCheckoutButtonVisible(true);
    };

    calculateOrderPrice();
  }, [order.orderItems]);

  useEffect(() => {
    navigation.setOptions({
      title: restaurantWithMenuItems.name,
    });
  }, [navigation, restaurantWithMenuItems.name]);

  const addToOrder = (orderItem) => {
    var orderItemsNew = order.orderItems.slice();
    orderItemsNew.push(orderItem);
    var newOrder = {...order, orderItems: orderItemsNew};
    setOrder(newOrder);
  };

  return (
    <View style={tailwind('flex-1')}>
      {restaurantRequestError && (
        <Error errorText="Error loading resturant.">Error</Error>
      )}
      {loading && (
        <View style={tailwind('flex-1 justify-center')}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {restaurantWithMenuItems.address && (
        <View style={tailwind('flex-1 bg-white')}>
          <Restaurant
            restaurant={restaurantWithMenuItems}
            addToOrder={addToOrder}
            navigation={navigation}
          />
          {checkoutButtonVisible && (
            <Pressable
              onPress={() => {
                navigation.navigate('Checkout', {order: order});
              }}
              testID="goToCheckout">
              <View style={tailwind('bg-blue-500 p-4 mb-6')}>
                <View style={tailwind('flex-row justify-between')}>
                  <Text style={tailwind('text-white text-base')}>
                    Go to checkout
                  </Text>
                  <Text style={tailwind('text-white text-base')}>
                    {orderPrice},00
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
