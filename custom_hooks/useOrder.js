import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useOrder() {
  [order, setOrder] = useState({});

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    let order = await getOrder();
    if (order === undefined) {
      return;
    }

    setOrder(order);
    return order;
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

  return order;
}

