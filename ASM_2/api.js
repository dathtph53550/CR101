import axios from 'axios';
import { Platform } from 'react-native';

const LOCAL_HOST = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const instance = axios.create({
    baseURL: LOCAL_HOST,
    timeout: 10000,
    headers: {
        buildversion: '1.0.0',
        buildnumber: '1',
        platform: Platform.OS,
    },
});

// Xử lý lỗi chung
instance.interceptors.response.use(
    (response) => response, 
    (error) => {
        const { data, status } = error.response || {};
        console.log(`Error ${status}: ${data?.message || 'Unknown error'}`);
        return Promise.reject(error);
    }
);

const responseBody = (response) => response.data;
const responseError = (error) => ({
    isError: true,
    message: error?.response?.data || error.message,
});

export const api = {
    get: (url, config) => instance.get(url, config).then(responseBody).catch(responseError),
    post: (url, body, config) => instance.post(url, body, config).then(responseBody).catch(responseError),
    put: (url, body, config) => instance.put(url, body, config).then(responseBody).catch(responseError),
    delete: (url, config) => instance.delete(url, config).then(responseBody).catch(responseError),
};
