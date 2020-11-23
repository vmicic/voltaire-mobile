import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './components/login';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Login />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});