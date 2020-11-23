import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function RestaurantItem({ item }) {
    return (
        <TouchableOpacity onPress>
            <View style={styles.restaurantItem}>
                <Text>
                    {item.name}
                </Text>
                <Text>
                    {item.description}
                </Text>
                <Text>
                    {item.address}
                </Text>
            </View>
        </TouchableOpacity>
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