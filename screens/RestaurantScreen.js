/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
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
    <View style={styles.contentContainer}>
      {restaurantRequestError && (
        <Error errorText="Error loading resturant.">Error</Error>
      )}
      {loading && (
        <View style={styles.activityIndicator}>
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
            <View style={styles.buttonContainer}>
              <Button
                title={'Go to checkout (' + orderPrice + ' RSD)'}
                onPress={() => {
                  navigation.navigate('Checkout', {order: order});
                }}
                testID="goToCheckout"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  restaurantDetailsContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  menuItemsContainer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 20,
  },
});
