import React from 'react';
import {StyleSheet, Text, View, DevSettings, Button} from 'react-native';

export default function Error({errorText}) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorText}</Text>
      <Button title="Reload app" onPress={() => DevSettings.reload()} />
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
});
