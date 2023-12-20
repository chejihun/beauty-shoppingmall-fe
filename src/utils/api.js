import axios from "axios";


const PROXY_URL = process.env.REACT_APP_BACKEND_PROXY
const LOCAL_URL = process.env.REACT_APP_LOCAL_BACKEND
const BASE_URL = process.env.NODE_ENV === "production" ?  PROXY_URL : LOCAL_URL;
console.log("1번", PROXY_URL)
console.log("2번", LOCAL_URL)
console.log("3번", BASE_URL)
// const BASE_URL = process.env.REACT_APP_BACKEND_PROXY;

// 프론트를 프론트로 back은 public
const api = axios.create({
  baseURL: PROXY_URL,
  headers: { 
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  (request) => {
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);
//에러메세지
api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
