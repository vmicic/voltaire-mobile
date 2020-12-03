import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import * as axios from 'axios';
import { ActivityIndicator } from 'react-native';

import RestaurantItem from '../components/RestaurantItem'

export default function RestaurantsScreen({ navigation }) {
    [resturants, setRestaurants] = useState([]);
    [loading, setLoading] = useState(true);

    const getAllRestaurantsUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants';
    const isFocused = useIsFocused();

    useEffect(() => {
        clearCart();
    }, [isFocused]);

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = () => {
        axios.get(getAllRestaurantsUrl)
            .then(response => {
                setRestaurants(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching all restaurants")
                console.log(error);
            })
    }

    axios.interceptors.request.use(
        async config => {
            const token = await getIdToken();
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );

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

    const clearCart = async () => {
        try {
            await AsyncStorage.removeItem('@order')
        } catch (e) {
        }
    }

    return (
        <View style={styles.content}>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
                :
                <FlatList
                    data={resturants}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Restaurant', { restaurantId: item.id });
                        }}>
                            <RestaurantItem restaurant={item} />
                        </TouchableOpacity>
                    )} />}
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