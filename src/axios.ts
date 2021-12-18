import axios from 'axios';

const proyectosAPI = axios.create({
  baseURL: 'https://squad10-aninfo-backend.herokuapp.com',
});

const soporteAPI = axios.create({
  baseURL: 'https://soporte-squad6.herokuapp.com',
});

const recursosAPI = axios.create({
  baseURL: 'https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/',
});

export {
	proyectosAPI,
	soporteAPI,
	recursosAPI
}
