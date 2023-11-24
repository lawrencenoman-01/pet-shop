/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'auth/register',
  login: 'auth/login',
  product: 'product',
  midtrans: 'product/midtrans',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

// Authentication
export const register = (register) => {
  return callAPI(urls.register, 'POST', {}, {}, register);
};
export const login = (login) => {
  return callAPI(urls.login, 'POST', {}, {}, login);
};

// Products
export const getProduct = () => {
  return callAPI(urls.product, 'GET', {}, {}, {});
};
export const getProductById = (id) => {
  return callAPI(`${urls.product}/${id}`, 'GET');
};
export const createProduct = (data) => {
  return callAPI(urls.product, 'POST', {}, {}, data);
};
export const updateProduct = ({ formDataObj, id }) => {
  return callAPI(`${urls.product}/${id}`, 'PUT', {}, {}, formDataObj);
};
export const deleteProduct = (id) => {
  return callAPI(`${urls.product}/${id}`, 'DELETE');
};
export const midtrans = (data) => {
  return callAPI(urls.midtrans, 'POST', {}, {}, data);
};
