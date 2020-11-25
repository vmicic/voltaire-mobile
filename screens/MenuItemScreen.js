import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Button, Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuItemScreen({ route, navigation }) {
    [quantity, setQuantity] = useState(1);
    [additionalInfo, setAdditionalInfo] = useState('');

    const { menuItem } = route.params;

    const increaseQuantity = () => {
        setQuantity(previousQuantity => {
            return (previousQuantity + 1)
        })
    }

    const deductQuantity = () => {
        setQuantity(previousQuantity => {
            if (previousQuantity > 0) {
                return (previousQuantity - 1)
            }
            return 0;
        })
    }

    const updateAdditionalInfo = (val) => {
        setAdditionalInfo(val);
    }

    const addToOrder = async () => {
        if(quantity < 1) {
            alert("Quantity must be greater than 0.");
            return;
        }
        
        let order = await getOrder();
        order.orderItems.push({ menuItemId: menuItem.id, menuItemName: menuItem.name, price: menuItem.price, quantity: quantity, additionalInfo: additionalInfo })
        saveOrder(order);
        
        navigation.goBack();
    }

    const getOrder = async () => {
        try {
            const orderJson = await AsyncStorage.getItem('@order')
            if (orderJson === null) {
                let order = {
                    restaurantId: menuItem.restaurantId,
                    orderItems: []
                }
                return order;
            }

            return JSON.parse(orderJson);
        } catch (e) {
        }
    }

    const saveOrder = async (order) => {
        try {
            const jsonValue = JSON.stringify(order)
            await AsyncStorage.setItem('@order', jsonValue)
          } catch (e) {
            // saving error
          }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: ""
        });
    }, [navigation, ""]);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
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
                        <Icon.Button
                            name='remove'
                            size={25}
                            style={styles.buttonStyle}
                            iconStyle={{ marginRight: 1 }}
                            color="black"
                            backgroundColor="white"
                            onPress={deductQuantity}
                        />
                        <Text style={{ textAlignVertical: 'center' }}>{quantity}</Text>
                        <Icon.Button
                            name='add'
                            size={25}
                            iconStyle={{ marginRight: 1 }}
                            style={{ borderColor: "black", borderWidth: 1, borderRadius: 25 }}
                            color="black"
                            backgroundColor="white"
                            onPress={increaseQuantity}
                        />
                    </View>
                </View>

                <View style={styles.additionalInfoContainer}>
                    <View>
                        <Text>Additional info: </Text>
                        <View style={styles.additionalInfoInputContainer}>
                            <TextInput
                                style={styles.additionalInfoInput}
                                placeholder="If you have additional informations please write it here."
                                multiline={true}
                                value={additionalInfo}
                                onChangeText={updateAdditionalInfo}
                            />
                        </View>
                    </View>
                    <View>
                        <Button
                            title="Add to order"
                            onPress={addToOrder}
                        />
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
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
        height: 50,
        backgroundColor: 'white'
    },
    quantityLabel: {
        textAlignVertical: 'center'
    },
    quantityInputContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    quantityInput: {
        width: 60,
        height: 50,
        backgroundColor: '#edf0ee',
        textAlign: 'center'
    },
    buttonStyle: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 25
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