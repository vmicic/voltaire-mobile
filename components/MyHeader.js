import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function MyHeader({yOffset, title, navigation}) {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const handleHeaderHeight = () => {
    let newHeight = 300 - yOffset < 100 ? 100 : 300 - yOffset;
    return {
      height: newHeight,
    };
  };

  const handleImageSize = () => {
    let newHeight = 300 - yOffset < 100 ? 100 : 300 - yOffset;
    let newOpacity = (newHeight - 100) / 200;

    return {
      height: newHeight,
      width: imageWidth,
      opacity: newOpacity,
    };
  };

  const handleHeaderTitle = () => {
    let newOpacity;
    if (yOffset < 200) {
      newOpacity = 0;
    } else if (yOffset < 250) {
      newOpacity = (yOffset - 200) / 50;
    } else {
      newOpacity = 1;
    }

    let newPaddingTop = (1 - newOpacity) * 17;

    return {
      opacity: newOpacity,
      paddingTop: newPaddingTop,
    };
  };

  const handleButtonColor = () => {
    let newColorRgb;

    if (yOffset < 200) {
      let rgbValue = Math.trunc(255 - yOffset / 10);
      if (rgbValue > 255) {
        rgbValue = 255;
      }
      newColorRgb = 'rgb(' + rgbValue + ', ' + rgbValue + ', ' + rgbValue + ')';
    } else {
      newColorRgb = 'rgb(235, 235, 235)';
    }

    return {
      backgroundColor: newColorRgb,
    };
  };

  const handleIconStyle = () => {
    let newOpacity;
    let newWidthHeight;
    let newBorderRadius;
    let newPaddingLeft;
    let newPaddingTop;

    if (yOffset <= 0) {
      newOpacity = 1;
      newWidthHeight = 40;
      newPaddingLeft = 7;
      newBorderRadius = 20;
      newPaddingTop = 6;
    } else if (yOffset < 200) {
      newOpacity = 1 - yOffset / 170;
      newWidthHeight = 40 - Math.trunc(yOffset / 9);
      newBorderRadius = 20 - Math.trunc(yOffset / 17);
      newPaddingLeft = 7 + Math.trunc(yOffset / 30);
      newPaddingTop = 6 + Math.trunc(yOffset / 90);
    } else {
      newOpacity = 0;
    }

    return {
      opacity: newOpacity,
      height: newWidthHeight,
      width: newWidthHeight,
      borderRadius: newBorderRadius,
      paddingLeft: newPaddingLeft,
      paddingTop: newPaddingTop,
    };
  };

  const handleIconSize = () => {
    let newImageSize;

    if (yOffset <= 0) {
      newImageSize = 28;
    } else if (yOffset < 200) {
      newImageSize = Math.trunc(28 - yOffset / 7.4);
    } else {
      newImageSize = 1;
    }

    return newImageSize;
  };

  const handleOptionsIconContainer = () => {
    let newPaddingTop;

    if (yOffset <= 0) {
      newPaddingTop = 0;
    } else if (yOffset < 200) {
      newPaddingTop = Math.trunc(yOffset / 40);
    }
    return {
      paddingLeft: 10,
      paddingTop: newPaddingTop,
    };
  };

  const handleHeartIconContainer = () => {
    let newPaddingLeft;

    if (yOffset <= 0) {
      newPaddingLeft = 0;
    }
    if (yOffset < 200) {
      newPaddingLeft = 0 + Math.trunc(yOffset / 3.5);
    } else {
      newPaddingLeft = 57;
    }

    return {
      paddingLeft: newPaddingLeft,
    };
  };

  return (
    <View
      style={[
        tailwind(
          'flex-row absolute inset-0 justify-between bg-white border-b-2 px-3 pt-12',
        ),
        handleHeaderHeight(),
      ]}>
      <View style={[tailwind('absolute'), handleImageSize()]}>
        <Image
          style={tailwind('flex-1 rounded-t-xl')}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVum_xcLaK7VkfaWUvUqTaYu4YnzBJMEHl3w&usqp=CAU',
          }}
        />
      </View>
      <View style={tailwind('flex-1')}>
        <Icon
          name="arrow-back-outline"
          size={28}
          style={[styles.icon, handleButtonColor()]}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={[
            tailwind('font-bold text-xl'),
            styles.titleText,
            handleHeaderTitle(),
          ]}>
          {title}
        </Text>
      </View>
      <View style={tailwind('flex-1 flex-row items-start')}>
        <View style={handleHeartIconContainer()}>
          <Icon
            name="heart-outline"
            size={28}
            style={[styles.icon, handleButtonColor()]}
          />
        </View>
        <View style={handleOptionsIconContainer()}>
          <Icon
            name="ellipsis-vertical-outline"
            size={handleIconSize()}
            style={[styles.optionsIcon, handleButtonColor(), handleIconStyle()]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: 'black',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 6,
    height: 40,
    width: 40,
  },
  optionsIcon: {
    color: 'black',
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleContainer: {
    flex: 2,
    paddingTop: 10,
  },
  titleText: {
    textAlign: 'center',
  },
});
