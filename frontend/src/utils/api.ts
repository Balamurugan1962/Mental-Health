import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api", 
  withCredentials: true,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
