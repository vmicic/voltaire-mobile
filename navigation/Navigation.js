import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios';

import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { ActivityIndicator } from 'react-native';

import ApiAuthService from '../api/ApiAuthService';
import AsyncStorageService from '../components/AsyncStorageService';


export default function Navigation() {
    [initialRouteName, setInitialRouteName] = useState("Login");
    [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshIdToken();
    }, []);

    const refreshIdToken = async () => {
        const refreshToken = await AsyncStorageService.getToken("refreshToken");
        if (refreshToken === null) {
            setInitialRouteName("Login");
            setLoading(false);
            return;
        }

        requestNewIdToken(refreshToken);
    }

    const requestNewIdToken = (refreshToken) => {
        ApiAuthService.auth.refreshIdToken({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        })
            .then(response => {
                const idToken = response.data.id_token;
                AsyncStorageService.storeToken("idToken", idToken);
                setInitialRouteName("Home");
                setLoading(false);
            })
            .catch(error => {
                console.log("Error refreshing token in navigation");
                console.log(error);
            })
    }

    const MainStack = createStackNavigator();

    return (
        <NavigationContainer>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
                :
                <MainStack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={initialRouteName}

                >
                    <MainStack.Screen name="Login" component={LoginScreen} />
                    <MainStack.Screen name="Home" component={BottomTabNavigator} />
                </MainStack.Navigator>
            }
        </NavigationContainer>
    );
}