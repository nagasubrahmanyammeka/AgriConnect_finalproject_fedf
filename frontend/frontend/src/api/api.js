import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getUsers = (token) =>
  API.get("/users", { headers: { Authorization: `Bearer ${token}` } });
export const deleteUser = (id, token) =>
  API.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// ✅ Added this export
export const getProducts = (token) =>
  API.get("/products", { headers: { Authorization: `Bearer ${token}` } });
