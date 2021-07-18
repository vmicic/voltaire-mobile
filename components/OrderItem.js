import React from 'react';
import {Text, View} from 'react-native';
import tailwind from 'tailwind-rn';

export default function MenuItem({orderItem}) {
  return (
    <View
      style={tailwind(
        'flex-1 flex-row justify-between px-4 py-6 border-b border-gray-200',
      )}>
      <View style={tailwind('flex-row')}>
        <Text>{orderItem.quantity} x </Text>
        <Text>{orderItem.menuItemName}</Text>
      </View>
      <View>
        <Text>{orderItem.price * orderItem.quantity},00 RSD</Text>
      </View>
    </View>
  );
}
