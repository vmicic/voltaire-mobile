import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function Restaurants() {
  [resturants, setRestaurants] = useState([
    { key: '1', name: 'La fresh'}
  ])

  return (
    <View>
      <Text>All restaurants</Text>
    </View>
  );
}