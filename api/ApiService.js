import axios from 'axios'

import AsyncStorageService from '../components/AsyncStorageService';

const getAllRestaurantsUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants';
const getRestaurantUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants/';
const createOrderUrl = 'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/orders';

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
    },
    orders:{
        create(order) {
            return axios.post("da", order);
        }
    }
};