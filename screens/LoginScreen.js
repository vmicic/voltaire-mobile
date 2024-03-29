import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import ApiAuthService from '../api/ApiAuthService';
import AsyncStorageService from '../components/AsyncStorageService';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const submitLogin = () => {
    ApiAuthService.auth
      .login({
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .then((response) => {
        const idToken = response.data.idToken;
        const refreshToken = response.data.refreshToken;
        AsyncStorageService.storeToken('idToken', idToken);
        AsyncStorageService.storeToken('refreshToken', refreshToken);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  const updateEmail = (val) => {
    setEmail(val);
  };

  const updatePassword = (val) => {
    setPassword(val);
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="email"
          style={styles.textInput}
          value={email}
          onChangeText={updateEmail}
          testID="email"
        />
        <TextInput
          placeholder="password"
          style={styles.textInput}
          value={password}
          onChangeText={updatePassword}
          secureTextEntry={true}
          testID="password"
        />
        <View style={styles.loginButtonContainer}>
          <Button title="Login" onPress={submitLogin} testID="loginButton" />
        </View>
        <View style={styles.errorContainer}>
          {loginError && (
            <Text style={styles.errorText}>Wrong username or password.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#edf0ee',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  textInput: {
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 20,
  },
  loginButtonContainer: {
    marginTop: 50,
  },
  errorContainer: {
    paddingTop: 10,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
