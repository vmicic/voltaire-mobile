import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  const logout = () => {
    removeTokens();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  const removeTokens = async () => {
    try {
      await AsyncStorage.removeItem('@idToken');
      await AsyncStorage.removeItem('@refreshToken');
    } catch (e) {
      console.log('Error while removing tokens');
    }
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
