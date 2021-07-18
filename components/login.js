import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChangeHandler = (val) => {
    setUsername(val);
  };

  const passwordChangeHandler = (val) => {
    setPassword(val);
  };

  return (
    <View>
      <TextInput
        placeholder="username"
        onChangeText={usernameChangeHandler}
        value={username}
      />
      <TextInput
        placeholder="password"
        onChangeText={passwordChangeHandler}
        value={password}
      />
      <Button onPress={() => console.log(username, password)} title="Login" />
    </View>
  );
}
