import React from 'react';
import {StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function MyHeader({yOffset, title, navigation}) {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const handleScrollHeader = () => {
    let newHeight = 300 - yOffset < 100 ? 100 : 300 - yOffset;
    return {
      height: newHeight,
    };
  };

  const handleScrollImage = () => {
    let newHeight = 300 - yOffset < 100 ? 100 : 300 - yOffset;
    let newOpacity = (newHeight - 100) / 200;

    return {
      height: newHeight,
      width: imageWidth,
      opacity: newOpacity,
    };
  };

  const handleScrollText = () => {
    let newOpacity;
    if (yOffset <= 200) {
      newOpacity = 0;
    } else if (yOffset > 250) {
      newOpacity = 1;
    } else {
      newOpacity = (yOffset - 200) / 50;
    }

    let newPaddingTop = (1 - newOpacity) * 17;

    return {
      opacity: newOpacity,
      paddingTop: newPaddingTop,
    };
  };

  const handleScrollIcon = () => {
    let newColorRgb;

    if (yOffset < 200) {
      const rgbValue = 255 - yOffset / 10;
      newColorRgb = 'rbg(' + rgbValue + ', ' + rgbValue + ', ' + rgbValue + ')';
    }

    return {
      backgroundColor: newColorRgb,
    };
  };

  return (
    <View
      style={[
        tailwind(
          'flex-row absolute inset-0 justify-between bg-white border-b-2 px-3 pt-12',
        ),
        handleScrollHeader(),
      ]}>
      <View style={[tailwind('absolute'), handleScrollImage()]}>
        <Image
          style={tailwind('flex-1 rounded-t-xl')}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Aspect_ratio_16_9_example.jpg',
          }}
        />
      </View>
      <View style={tailwind('flex-1')}>
        <Icon
          name="arrow-back-outline"
          size={28}
          style={[styles.icon, handleScrollIcon()]}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={[
            tailwind('font-bold text-xl'),
            styles.titleText,
            handleScrollText(),
          ]}>
          {title}
        </Text>
      </View>
      <View style={tailwind('flex-1 flex-row items-start')}>
        <Icon name="heart-outline" size={28} style={styles.icon} />
        <Icon
          name="ellipsis-vertical-outline"
          size={28}
          style={styles.optionsIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: 'black',
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'rgb(255,255,255)',
    overflow: 'hidden',
    padding: 6,
    height: 40,
    width: 40,
  },
  optionsIcon: {
    color: 'black',
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: '#f5f3f0',
    overflow: 'hidden',
    padding: 6,
    height: 40,
    width: 40,
    marginLeft: 5,
  },
  titleContainer: {
    flex: 2,
    paddingTop: 10,
  },
  titleText: {
    textAlign: 'center',
  },
});
