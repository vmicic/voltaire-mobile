import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Keyboard,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MenuItemScreen({route, navigation}) {
  const [quantity, setQuantity] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const {menuItem, addToOrder} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  const increaseQuantity = () => {
    setQuantity((previousQuantity) => {
      return previousQuantity + 1;
    });
  };

  const deductQuantity = () => {
    setQuantity((previousQuantity) => {
      if (previousQuantity > 0) {
        return previousQuantity - 1;
      }
      return 0;
    });
  };

  const updateAdditionalInfo = (val) => {
    setAdditionalInfo(val);
  };

  const addClick = () => {
    addToOrder({
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      price: menuItem.price,
      quantity: quantity,
      additionalInfo: additionalInfo,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.menuItemContainer}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.menuItemNameContainer}>
          <Text style={styles.menuItemName}>{menuItem.name}</Text>
          <Text>{menuItem.description}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityLabelContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
          </View>
          <View style={styles.quantityInputContainer}>
            <Icon.Button
              name="remove"
              size={25}
              style={styles.buttonStyle}
              iconStyle={styles.iconStyle}
              color="black"
              backgroundColor="white"
              onPress={deductQuantity}
            />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Icon.Button
              name="add"
              size={25}
              iconStyle={styles.iconStyle}
              style={styles.buttonStyle}
              color="black"
              backgroundColor="white"
              onPress={increaseQuantity}
            />
          </View>
        </View>
      </Pressable>

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
          <Button title="Add to order" onPress={addClick} />
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
    backgroundColor: 'white',
  },
  menuItemName: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  quantityContainer: {
    marginBottom: 5,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  quantityLabelContainer: {
    flex: 3,
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
  },
  quantityLabel: {
    textAlignVertical: 'center',
  },
  quantityInputContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  quantityInput: {
    width: 60,
    height: 50,
    backgroundColor: '#edf0ee',
    textAlign: 'center',
  },
  buttonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
  },
  iconStyle: {
    marginRight: 1,
  },
  quantityText: {
    textAlignVertical: 'center',
  },
  additionalInfoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  additionalInfoInputContainer: {
    marginTop: 10,
  },
  additionalInfoInput: {
    backgroundColor: '#edf0ee',
  },
});
