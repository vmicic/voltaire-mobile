import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

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
    <View style={styles.profileContainer}>
      <View style={styles.logoutContainer}>
        <Button title="Logout" color="#f23535" onPress={logout} />
      </View>
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
