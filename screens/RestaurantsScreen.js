import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, DevSettings } from 'react-native';

import RestaurantItem from '../components/RestaurantItem';
import ApiService from '../api/ApiService'
import Error from '../components/Error';

export default function RestaurantsScreen({ navigation }) {
    [restaurants, setRestaurants] = useState([]);
    [loading, setLoading] = useState(true);
    [error, setError] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        clearCart();
    }, [isFocused]);

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = () => {
        ApiService.restaurants.getAll()
            .then(response => {
                setRestaurants(response.data)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(true);
            })
    }

    const clearCart = async () => {
        try {
            await AsyncStorage.removeItem('@order')
        } catch (e) {
        }
    }

    return (
        <View style={styles.content}>
            {error && <Error errorText="Error loading restaurants."></Error>}
            {loading &&
                < View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            }
            {
                restaurants[0] &&
                <FlatList
                    data={restaurants}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Restaurant', { restaurantId: item.id });
                        }}>
                            <RestaurantItem restaurant={item} />
                        </TouchableOpacity>
                    )} />
            }
        </View >
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    },
    errorText: {
        textAlign: 'center',
        color: 'green'
    }
});