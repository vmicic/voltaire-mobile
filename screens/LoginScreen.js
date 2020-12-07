import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiAuthService from '../api/ApiAuthService';

export default function LoginScreen({ navigation }) {
    [email, setEmail] = useState('');
    [password, setPassword] = useState('');
    [loginError, setLoginError] = useState(false);

    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyi6Eyf9398GAGqa1B4DB-uReBGFJfPbE';

    const submitLogin = () => {
        ApiAuthService.auth.login ({
            email: email,
            password: password,
            returnSecureToken: true
            })
            .then(response => {
                const idToken = response.data.idToken;
                const refreshToken = response.data.refreshToken;
                storeToken("idToken", idToken);
                storeToken("refreshToken", refreshToken);
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home'
                        }
                    ]
                })
            })
            .catch(error => {
                console.log("Login response error")
                console.log(error);
                setLoginError(true);
            });
    }

    const storeToken = async (name, token) => {
        try {
            const storageKey = "@" + name;
            await AsyncStorage.setItem(storageKey, token)
        } catch (e) {
            console.log("Error storing token")
            console.log(e);
        }
    }
    

    const updateEmail = (val) => {
        setEmail(val);
    }

    const updatePassword = (val) => {
        setPassword(val);
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="email"
                    style={styles.textInput}
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    placeholder="password"
                    style={styles.textInput}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                />
                <View style={styles.loginButtonContainer}>
                    <Button
                        title="Login"
                        onPress={submitLogin}
                    />
                </View>
                <View style={styles.errorContainer}>
                    {
                        loginError && <Text style={styles.errorText}>
                            Wrong username or password.
                        </Text>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: '#edf0ee',
        justifyContent: 'center'
    },
    formContainer: {
        padding: 20,
        backgroundColor: 'white'
    },
    textInput: {
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 20
    },
    loginButtonContainer: {
        marginTop: 50
    },
    errorContainer: {
        paddingTop: 10,
        justifyContent: 'center'
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }
});