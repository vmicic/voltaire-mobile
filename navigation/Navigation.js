import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ProfileScreen from '../screens/ProfileScreen';
import RestaurantsStackScreen from '../screens/RestaurantsStackScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';

const MainStack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <MainStack.Screen name="Login" component={LoginScreen} />
                <MainStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}