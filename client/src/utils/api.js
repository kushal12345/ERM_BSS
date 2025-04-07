import axios from 'axios';
import { baseURL } from './Baseaddress';

const api = axios.create({
    baseURL
});

export default api;