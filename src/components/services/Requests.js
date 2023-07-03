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

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export async function register(data) {
  await getSanctum();

  return await apiClient.post("/api/register", data).then(
    (response) => {
      if (response.status === 201) {
        setToken(response.data.data.authorization);
        window.location.href = "/tasks";
        return { status: 200 };
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
        window.location.href = "/tasks";
        return { status: 200 };
      }
    },
    (error) => {
      return error.response.data;
    }
  );
}

export async function logout() {
  return await apiClient.post("/api/logout", [], config).then((response) => {
    if (response.status === 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  });
}

export function getTasks(queryParams = "") {
  return apiClient.get("/api/tasks/get?" + queryParams, config);
}

export function getPriorities() {
  return apiClient.get("/api/priorities/index", config);
}

export async function addTask(data) {
  return await apiClient.post("/api/tasks/store", data, config).then(
    (response) => {
      if (response.status === 201) {
        window.location.href = "/tasks";
        return { status: 201 };
      }
    },
    (error) => {
      console.log(error);
      return error.response.data;
    }
  );
}
