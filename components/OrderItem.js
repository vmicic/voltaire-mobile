import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MenuItem({orderItem}) {
  return (
    <View style={styles.orderItemContainer}>
      <View style={styles.menuItemNameContainer}>
        <Text>{orderItem.quantity} x </Text>
        <Text>{orderItem.menuItemName}</Text>
      </View>
      <View style={styles.menuItemPriceContainer}>
        <Text>{orderItem.price * orderItem.quantity} RSD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 20,
    borderBottomColor: '#e6ebe7',
    borderBottomWidth: 1,
  },
  menuItemNameContainer: {
    flexDirection: 'row',
  },
});
