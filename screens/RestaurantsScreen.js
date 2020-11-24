import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import RestaurantItem from '../components/RestaurantItem'

export default function RestaurantsScreen({ navigation }) {
    [resturants, setRestaurants] = useState([
        { key: '1', name: 'La fresh', description: 'Best pizza', address: 'Brace Ribnikar 10' },
        { key: '2', name: 'Sef', description: 'Best sendwichees', address: 'Brace Ribnikar 3' },
        { key: '3', name: 'Kao nekad', description: 'Best cooked meals', address: 'Danila Kisa 4' }
    ])


    return (
        <View style={styles.content}>
            <FlatList
                data={resturants}
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
        backgroundColor: 'yellow',
    },
});