import axios from 'axios';

import AsyncStorageService from '../components/AsyncStorageService';

const getAllRestaurantsUrl =
  'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants';
const getRestaurantUrl =
  'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/restaurants/';
const createOrderUrl =
  'https://voltaire-api-gateway-cvy8ozaz.ew.gateway.dev/orders';

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorageService.getToken('idToken');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default {
  restaurants: {
    getAll() {
      return new Promise((resolve, reect) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: [
              {
                id: '1',
                name: 'La fresh',
                description: 'Best pizza, burgers and pancakes',
                address: 'Brace Ribnikar 20',
              },
            ],
          });
        });
      });
    },
    getRestaurant(id) {
      return new Promise((resolve, reect) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: {
              id: '1',
              name: 'La fresh',
              description: 'Best pizza, burgers and pancakes',
              address: 'Brace Ribnikar 20',
              menuItems: [
                {
                  name: 'Burger',
                  price: 100,
                  description: 'Tasty bacon burger',
                },
                {
                  name: 'Quesadilla',
                  price: 200,
                  description: 'Best Mexican quesadilla',
                },
                {
                  name: 'Pancake',
                  price: 150,
                  description: 'Best sweet pancake',
                },
                {
                  name: 'Pizza',
                  description: 'Delicious pizza',
                  price: 999,
                },
              ],
            },
          });
        });
      });
    },
  },
  orders: {
    create(order) {
      return axios.post(createOrderUrl, order);
    },
  },
};
