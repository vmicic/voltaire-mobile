import React from 'react';
import {View, StyleSheet, Button, Pressable, Text} from 'react-native';
import tailwind from 'tailwind-rn';

import AsyncStorageService from '../components/AsyncStorageService';

export default function ProfileScreen({navigation}) {
  const logout = () => {
    AsyncStorageService.removeTokens();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  return (
    <View style={tailwind('flex-1 bg-gray-200 justify-end')}>
      <Pressable onPress={logout}>
        <View style={tailwind('bg-red-700 p-4')}>
          <View style={tailwind('flex-row justify-center')}>
            <Text style={tailwind('text-white text-base')}>Logout</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#edf0ee',
  },
  logoutContainer: {
    padding: 20,
  },
});
