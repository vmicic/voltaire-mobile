import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as axios from 'react-native-axios';

export default function ProfileScreen({ navigation }) {
    [email, setEmail] = useState('');
    [password, setPassword] = useState('');
    [loginError, setLoginError] = useState(false);

    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyi6Eyf9398GAGqa1B4DB-uReBGFJfPbE';

    const submitLogin = () => {

        axios.post(loginUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .then((response) => {
                const token = response.data.idToken;
                storeIdToken(token);
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'BottomTabNavigator'
                        }
                    ]
                })
            })
            .catch(function (error) {
                console.log("Login response error")
                console.log(error);
                setLoginError(true);
            });
    }

    const storeIdToken = async (idToken) => {
        try {
            await AsyncStorage.setItem('@idToken', idToken)
        } catch (e) {
            console.log("Error with id token store")
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
                    onChangeText={updateEmail}
                />
                <TextInput
                    placeholder="password"
                    style={styles.textInput}
                    value={password}
                    onChangeText={updatePassword}
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
        borderBottomWidth: 1
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