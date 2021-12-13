import axios from 'axios';

const proyectosAPI = axios.create({
  baseURL: 'https://squad10-aninfo-backend.herokuapp.com',
});

const soporteAPI = axios.create({
  baseURL: 'http://soporte-squad6.herokuapp.com',
});

export {
  proyectosAPI,
  soporteAPI
}
