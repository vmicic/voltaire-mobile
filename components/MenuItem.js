import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import tailwind from 'tailwind-rn';

export default function MenuItem({menuItem}) {
  return (
    <View style={tailwind('flex-1 flex-row p-4')}>
      <View style={styles.detailsTextContainer}>
        <Text style={tailwind('font-bold pr-4')} numberOfLines={1}>
          {menuItem.name}
        </Text>
        <Text numberOfLines={1}>{menuItem.description}</Text>
        <Text style={tailwind('mt-5 text-blue-500 font-bold')}>
          {menuItem.price},00 RSD
        </Text>
      </View>
      <View style={tailwind('flex-1')}>
        <Image
          style={tailwind('flex-1 rounded-xl')}
          source={{
            uri:
              'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsTextContainer: {
    flex: 2,
    flexDirection: 'column',
  },
});
