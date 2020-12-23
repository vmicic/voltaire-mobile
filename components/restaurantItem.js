import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import tailwind from 'tailwind-rn';

export default function RestaurantItem({restaurant}) {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width - 40;
  const imageHeight = Math.round((imageWidth * 9) / 16);

  return (
    <View style={styles.restaurantCard}>
      <View style={{height: imageHeight, width: imageWidth}}>
        <Image
          style={tailwind('flex-1 rounded-t-xl')}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVum_xcLaK7VkfaWUvUqTaYu4YnzBJMEHl3w&usqp=CAU',
          }}
        />
      </View>
      <View
        style={tailwind(
          'bg-white border-r border-l border-b border-gray-200 rounded-xl',
        )}>
        <View style={tailwind('flex-1 flex-col')}>
          <View
            style={tailwind(
              'flex-1 flex-row justify-between border-b-2 border-gray-200',
            )}>
            <View style={tailwind('p-4')}>
              <Text style={tailwind('font-bold')}>{restaurant.name}</Text>
              <Text style={tailwind('mt-1')}>{restaurant.description}</Text>
            </View>
            <View style={tailwind('m-4 pl-3 pr-3 pt-2 pb-2 bg-gray-100')}>
              <Text style={tailwind('text-center font-bold text-blue-500')}>
                15-25
              </Text>
              <Text
                style={tailwind('text-center font-thin text-xs text-blue-500')}>
                min
              </Text>
            </View>
          </View>
          <View style={tailwind('flex-row pl-4 pt-2 pb-2')}>
            <Text>
              $$${'  '}·{'  '}
            </Text>
            <Text>
              Delivery RSD100{'  '}·{'  '}
            </Text>
            <Text>9.2</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantCard: {
    marginTop: 10,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
