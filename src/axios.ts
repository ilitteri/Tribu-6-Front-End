import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://squad10-aninfo-backend.herokuapp.com',
});

export default instance;
