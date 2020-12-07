import { useState, useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useOrder(screenName) {
  [order, setOrder] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("useOrder: UseEffect for loading order, screen: " + screenName);
    //loadOrder();
  }, []);

  const loadOrder = async () => {
    let order = await getOrder();
    if (order === undefined) {
      return;
    }

    console.log("useOrder: Setting an order for screen: " + screenName);
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

  console.log("useOrder: Returning an order, for screen: " + screenName)
  console.log(order)
  return [order, setOrder];
}

