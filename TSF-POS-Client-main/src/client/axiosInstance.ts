import axios from "axios";

// Create Axios instance with default headers
const client = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://localhost:8000",
});

// hello

// getting token from localstorage
const token = localStorage.getItem("token");
if (token) {
  // setting the token in auth header
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default client;
