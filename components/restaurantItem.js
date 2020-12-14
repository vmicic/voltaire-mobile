import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import tailwind from 'tailwind-rn';

export default function RestaurantItem({restaurant}) {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width - 40;
  const imageHeight = Math.round((imageWidth * 9) / 16);

  return (
    <View style={tailwind('mt-10')}>
      <View style={{height: imageHeight, width: imageWidth}}>
        <Image
          style={tailwind('flex-1 rounded-t-xl')}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Aspect_ratio_16_9_example.jpg',
          }}
        />
      </View>
      <View>
        <View style={tailwind('flex-row')}>
          <View style={tailwind('border-l-2 border-gray-100')} />
          <View style={tailwind('flex-1 flex-col')}>
            <View
              style={tailwind(
                'flex-1 flex-row justify-between border-b-2 border-gray-100',
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
                  style={tailwind(
                    'text-center font-thin text-xs text-blue-500',
                  )}>
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
          <View style={tailwind('border-r-2 border-gray-100')} />
        </View>
        <View style={styles.bottomBorderShadow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBorderShadow: {
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.5,
    justifyContent: 'flex-end',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
});
