import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import * as axios from 'react-native-axios';

import RestaurantItem from '../components/RestaurantItem'

export default function RestaurantsScreen({ navigation }) {
    [resturants, setRestaurants] = useState([
        { id: '1', name: 'La fresh', description: 'Best pizza', address: 'Brace Ribnikar 10' },
        { id: '2', name: 'Sef', description: 'Best sendwichees', address: 'Brace Ribnikar 3' },
        { id: '3', name: 'Kao nekad', description: 'Best cooked meals', address: 'Danila Kisa 4' }
    ])

    const postmanEcho = 'https://postman-echo.com/get';
    const getAllRestaurantsUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants';

    const getRestaurants = () => {
        axios.get(getAllRestaurantsUrl)
            .then((response) => {
                console.log("This is response from getting all restaurants");
                console.log(response.data);
                setRestaurants(response.data)
            })
            .catch((error) => {
                console.log("Couldnt get all restaurants")
                console.log(error);
            })
    }
    
    const getIdToken = async () => {
        try {
            const idToken = await AsyncStorage.getItem('@idToken')
            if (idToken === null) {
                return undefined;
            }
            return idToken;
        } catch (e) {
            console.log("Error with reading refresh token from navigation");
            console.log(e);
        }
    }

    axios.interceptors.request.use(
        async config => {
          const token = await getIdToken();
          if (token) {
            config.headers.Authorization = "Bearer "+ token;
          }
          return config;
        },
        error => {
          return Promise.reject(error)
        }
    );

    const isFocused = useIsFocused();

    useEffect(() => {
        clearCart();
    }, [isFocused]);

    useEffect(() => {
        console.log("Calling use effect for restaurants init")
        getRestaurants();
    }, []);

    const clearCart = async () => {
        try {
            await AsyncStorage.removeItem('@order')
        } catch (e) {
        }
    }

    return (
        <View style={styles.content}>
            <FlatList
                data={resturants}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Restaurant', { restaurantId: item.key });
                    }}>
                        <RestaurantItem restaurant={item} />
                    </TouchableOpacity>
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
});