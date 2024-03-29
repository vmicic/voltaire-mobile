import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async (name) => {
  try {
    return await AsyncStorage.getItem('@' + name);
  } catch (e) {
    console.log('Error with reading refresh token');
    console.log(e);
  }
};

const storeToken = async (name, token) => {
  try {
    const storageKey = '@' + name;
    await AsyncStorage.setItem(storageKey, token);
  } catch (e) {
    console.log('Error storing token');
    console.log(e);
  }
};

const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('@idToken');
    await AsyncStorage.removeItem('@refreshToken');
  } catch (e) {
    console.log('Error while removing tokens');
  }
};

export default {getToken, storeToken, removeTokens};
