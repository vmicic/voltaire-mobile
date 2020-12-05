import { useState, useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useOrder() {
  [order, setOrder] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    loadOrder();
  }, [isFocused]);

  const loadOrder = async () => {
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
      console.log("Error with async storage");
    }
  }

  return order;
}

