import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getUsers = async (limit = 10, skip = 0) => {
  const response = await axios.get(
    `${BASE_URL}/users?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`${BASE_URL}/users/search?q=${query}`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`);
  return response.data;
};

export const addUser = async (payload) => {
  const response = await axios.post(`${BASE_URL}/users/add`, payload);
  return response.data;
};

export const updateUser = async (id, payload) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};
