import axios from "axios";

const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;

const api = axios.create({
  baseURL: LOCAL_BACKEND
});


export default api;
