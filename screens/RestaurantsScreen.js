import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';

import RestaurantItem from '../components/RestaurantItem';
import ApiService from '../api/ApiService'

export default function RestaurantsScreen({ navigation }) {
    [resturants, setRestaurants] = useState([]);
    [loading, setLoading] = useState(true);

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
                console.log("Error fetching all restaurants")
                console.log(error);
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