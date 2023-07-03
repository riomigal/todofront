import apiClient from "./apiClient";
import axios from "axios";

async function getSanctum() {
  return apiClient.get("/sanctum/csrf-cookie");
}

const installToken = (type, token) =>
  (axios.defaults.headers.common["Authorization"] = `${type} ${token}`);

const setToken = (authorization) => {
  installToken(authorization.bearer, authorization.token);
  localStorage.setItem("token", authorization.token);
};

export async function register(data) {
  await getSanctum();

  return await apiClient.post("/api/register", data).then(
    (response) => {
      console.log(response);
      if (response.status === 201) {
        setToken(response.data.data.authorization);
        return { status: 201 };
      }
    },
    (error) => {
      return error.response.data;
    }
  );
}

export async function login(data) {
  await getSanctum();

  return await apiClient.post("/api/login", data).then(
    (response) => {
      if (response.status === 200) {
        setToken(response.data.data.authorization);
        return { status: 200 };
      }
    },
    (error) => {
      return error.response.data;
    }
  );
}
