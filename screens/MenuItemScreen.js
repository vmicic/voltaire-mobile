import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

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
    <View style={tailwind('flex-1 bg-gray-200')}>
      <Pressable onPress={() => Keyboard.dismiss()} testID="pressable">
        <View style={tailwind('bg-white p-4 mb-1')}>
          <Text style={tailwind('font-bold text-4xl')}>{menuItem.name}</Text>
          <Text>{menuItem.description}</Text>
        </View>

        <View style={tailwind('mb-1 flex-row bg-white p-4')}>
          <View style={styles.quantityLabelContainer}>
            <Text>Quantity:</Text>
          </View>
          <View style={styles.quantityInputContainer}>
            <Icon.Button
              name="remove"
              size={25}
              style={tailwind('border rounded-3xl')}
              iconStyle={tailwind('mr-0')}
              color="black"
              backgroundColor="white"
              onPress={deductQuantity}
              testID="decreaseQuantity"
            />
            <Text>{quantity}</Text>
            <Icon.Button
              name="add"
              size={25}
              iconStyle={tailwind('mr-0')}
              style={tailwind('border rounded-3xl bg-white')}
              color="black"
              backgroundColor="white"
              onPress={increaseQuantity}
              testID="increaseQuantity"
            />
          </View>
        </View>
      </Pressable>

      <View style={tailwind('flex-1 justify-between bg-white')}>
        <View style={tailwind('p-4')}>
          <Text>Additional info: </Text>
          <View style={tailwind('mt-2')}>
            <TextInput
              style={tailwind('bg-gray-200 h-48')}
              placeholder="If you have additional informations please write it here."
              multiline={true}
              numberOfLines={2}
              value={additionalInfo}
              onChangeText={updateAdditionalInfo}
              testID="additionalInfo"
            />
          </View>
        </View>
        <Pressable onPress={addClick} testID="addToOrder">
          <View style={tailwind('p-4 mb-6 bg-blue-500')}>
            <View style={tailwind('flex-row justify-center')}>
              <Text style={tailwind('text-base text-white')}>Add to order</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityLabelContainer: {
    flex: 3,
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  quantityInputContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  additionalInfoInputContainer: {
    marginTop: 10,
  },
  additionalInfoInput: {
    backgroundColor: '#edf0ee',
    height: 150,
  },
});
