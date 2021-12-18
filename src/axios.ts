import axios from 'axios';

const proyectosAPI = axios.create({
  baseURL: 'https://squad10-aninfo-backend.herokuapp.com',
});

const soporteAPI = axios.create({
  baseURL: 'https://soporte-squad6.herokuapp.com',
});

const recursosAPI = axios.create({
  baseURL: 'https://squad10-aninfo-backend.herokuapp.com',
});

export {
	proyectosAPI,
	soporteAPI,
	recursosAPI
}
