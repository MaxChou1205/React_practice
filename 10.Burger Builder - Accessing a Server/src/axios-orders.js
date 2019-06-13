import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-d6e3d.firebaseio.com/'
});

export default instance;