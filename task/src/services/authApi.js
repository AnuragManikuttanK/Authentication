
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});
export const getUserByEmail = (email) => {
    return api.get(`/users?email=${encodeURIComponent(email)}`);
};
export const checkUsername = (username) => {
    return api.get(`/users?username=${encodeURIComponent(username)}`);
};
export const registerUser = (userData) => {
    return api.post('/users', userData);
};
export const getUserById = (id) => {
    return api.get(`/users/${id}`);
};

