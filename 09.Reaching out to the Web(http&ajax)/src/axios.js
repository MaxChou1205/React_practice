import axios from 'axios';

const instane = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com';
});

export default instane;