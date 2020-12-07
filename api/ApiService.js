import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyi6Eyf9398GAGqa1B4DB-uReBGFJfPbE';
const getAllRestaurantsUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants';
const getRestaurantUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants/';

axios.interceptors.request.use(
    async config => {
        const token = await getIdToken();
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

const getIdToken = async () => {
    try {
        const idToken = await AsyncStorage.getItem('@idToken')
        if (idToken === null) {
            return undefined;
        }
        return idToken;
    } catch (e) {
        console.log("Error with reading refresh token");
        console.log(e);
    }
}

export default {
    restaurants: {
        getAll() {
            return axios.get(getAllRestaurantsUrl);
        },
        getRestaurant(id) {
            return axios.get(getRestaurantUrl + id);
        }
    }
};