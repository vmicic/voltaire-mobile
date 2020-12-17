import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';

import MenuItem from './MenuItem';
import RestaurantBasicInfo from './RestaurantBasicInfo';
import MyHeader from './MyHeader';

export default function Restaurant({navigation, restaurant, addToOrder}) {
  const [y, setY] = useState(0);

  const handleYOffset = (offset) => {
    setY(offset);
  };

  return (
    <View style={tailwind('flex-1')}>
      <MyHeader yOffset={y} title={restaurant.name} navigation={navigation} />
      <ScrollView
        style={[styles.scrollView]}
        scrollEventThrottle={16}
        onScroll={(e) => {
          handleYOffset(e.nativeEvent.contentOffset.y);
        }}>
        <RestaurantBasicInfo restaurant={restaurant} />
        {restaurant.menuItems.map(({}, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate('Menu Item', {
                menuItem: restaurant.menuItems[index],
                addToOrder: addToOrder,
              })
            }>
            <MenuItem menuItem={restaurant.menuItems[index]} />
          </Pressable>
        ))}
        <View style={styles.placeholderContainer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 180,
    marginTop: 100,
    flex: 1,
  },
  placeholderContainer: {
    paddingBottom: 250,
  },
});
