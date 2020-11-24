import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function MenuItemScreen({ route, navigation }) {

    const { menuItem } = route.params;

    return (
        <View style={styles.menuItemContainer}>
            <View style={styles.menuItemNameContainer}>
                <Text style={styles.menuItemName}>
                    {menuItem.name}
                </Text>
                <Text>
                    {menuItem.description}
                </Text>
            </View>

            <View style={styles.quantityContainer}>
                <View style={styles.quantityLabelContainer}>
                    <Text style={styles.quantityLabel}>
                        Quantity:
                        </Text>
                </View>
                <View style={styles.quantityInputContainer}>
                    <TextInput style={styles.quantityInput}>

                    </TextInput>
                </View>
            </View>

            <View style={styles.additionalInfoContainer}>
                <View>
                    <Text>Additional info: </Text>
                    <View style={styles.additionalInfoInputContainer}>
                        <TextInput
                            style={styles.additionalInfoInput}
                            placeholder="If you have additional informations please write it here fadjfklsdjdfsa"
                            multiline={true}
                        />
                    </View>
                </View>
                <View>
                    <Button 
                        title="Add to order"
                    />
                </View>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    menuItemContainer: {
        flex: 1,
        backgroundColor: '#edf0ee',
    },
    menuItemNameContainer: {
        marginBottom: 5,
        padding: 20,
        backgroundColor: 'white'
    },
    menuItemName: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    quantityContainer: {
        marginBottom: 5,
        padding: 20,
        flexDirection: "row",
        backgroundColor: 'white'
    },
    quantityLabelContainer: {
        flex: 3,
        flexDirection: 'row',
        height: 50
    },
    quantityLabel: {
        textAlignVertical: 'center'
    },
    quantityInputContainer: {
        flex: 1,
    },
    quantityInput: {
        width: 60,
        height: 50,
        backgroundColor: '#edf0ee',
        textAlign: 'center'
    },
    additionalInfoContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    additionalInfoInputContainer: {
        marginTop: 10
    },
    additionalInfoInput: {
        backgroundColor: '#edf0ee',
    }

});