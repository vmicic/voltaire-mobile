import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorageService from '../components/AsyncStorageService';

const getAllRestaurantsUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants';
const getRestaurantUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants/';

axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorageService.getToken("idToken");
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

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