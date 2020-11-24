import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function RestaurantItem({ restaurant }) {
    return (
        <View style={styles.restaurantItem}>
            <Text>
                {restaurant.name}
            </Text>
            <Text>
                {restaurant.description}
            </Text>
            <Text>
                {restaurant.address}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    restaurantItem: {
        padding: 16,
        marginTop: 16,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    }
});