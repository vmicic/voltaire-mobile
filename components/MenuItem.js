import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function MenuItem({ menuItem }) {
    return (
        <View style={styles.menuItemContainer}>
            <Text>
                {menuItem.name}
            </Text>
            <Text>
                {menuItem.description}
            </Text>
            <Text>
                {menuItem.price} RSD
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItemContainer: {
        padding: 20,
        marginTop: 16,
        borderBottomColor: '#e6ebe7',
        borderBottomWidth: 1,
    }
});