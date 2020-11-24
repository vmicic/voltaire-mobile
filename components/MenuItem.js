import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function MenuItem({ menuItem }) {
    return (
        <View style={styles.menuItem}>
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
    menuItem: {
        padding: 16,
        marginTop: 16,
    }
});