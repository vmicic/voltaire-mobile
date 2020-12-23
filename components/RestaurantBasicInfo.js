import React from 'react';
import {Text, View, Pressable} from 'react-native';
import tailwind from 'tailwind-rn';

export default function RestaurantBasicInfo({restaurant}) {
  return (
    <View style={tailwind('mt-2')}>
      <Text style={tailwind('font-bold text-4xl mb-5 p-4')}>
        {restaurant.name}
      </Text>
      <View style={tailwind('flex-row justify-between px-4')}>
        <Text style={tailwind('text-lg')}>Burgers, pizza and pancakes</Text>
        <Text>$$$</Text>
      </View>
      <View style={tailwind('flex-row justify-between mt-10 px-4')}>
        <Text style={tailwind('py-2')}>Excellent 9.0</Text>
      </View>
      <View style={tailwind('flex-row justify-between mt-3 px-4')}>
        <Text style={tailwind('py-2')}>
          Open {restaurant.openingTime}:{restaurant.closingTime}
        </Text>
        <Pressable
          onPress={() => console.log('Pressed more info')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(219, 234, 254)' : '#e8f0fc',
            },
            tailwind('justify-center rounded-xl'),
          ]}>
          <Text style={tailwind('text-center text-blue-500 font-bold px-2')}>
            More info
          </Text>
        </Pressable>
      </View>
      <View style={tailwind('flex-row justify-between mt-3 px-4')}>
        <Text style={tailwind('py-2')}>Delivery in 20 - 30 min</Text>
        <Pressable
          onPress={() => console.log('Pressed more info')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(219, 234, 254)' : '#e8f0fc',
            },
            tailwind('justify-center rounded-xl'),
          ]}>
          <Text style={tailwind('text-center text-blue-500 font-bold px-2')}>
            Change
          </Text>
        </Pressable>
      </View>
      <View
        style={tailwind(
          'flex-row justify-between mt-3 border-gray-200 border-b-2 px-4 pb-5',
        )}>
        <Text style={tailwind('py-2')}>Order together</Text>
        <Pressable
          onPress={() => console.log('Pressed more info')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(219, 234, 254)' : '#e8f0fc',
            },
            tailwind('justify-center rounded-xl'),
          ]}>
          <Text style={tailwind('text-center text-blue-500 font-bold px-2')}>
            Start now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
