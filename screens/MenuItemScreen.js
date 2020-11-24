import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MenuItemScreen({ route, navigation }) {

    const { menuItem } = route.params;

    return (
        <View style={styles.menuItemContainer}>
            <View style={styles.menuItemName}>
                <Text>
                    {menuItem.name}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menuItemContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0ffff',
    },
    menuItemName: {
        backgroundColor: '#f08080',
        fontWeight: 'bold',
        fontSize: 40
    },
    restaurantName: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10
    },
    menuItemsContainer: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fafad2'
    }
});