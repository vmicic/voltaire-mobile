import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyi6Eyf9398GAGqa1B4DB-uReBGFJfPbE';
const refreshIdTokenUrl = 'https://identitytoolkit.googleapis.com/v1/token?key=AIzaSyDyi6Eyf9398GAGqa1B4DB-uReBGFJfPbE';

const axiosAuth = axios.create();

export default {
    auth: {
        login(payload) {
            return axiosAuth.post(loginUrl, payload);
        },
        refreshIdToken(payload) {
            return axiosAuth.post(refreshIdTokenUrl, payload);
        }
    }
};