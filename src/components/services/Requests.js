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

const forceLogoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
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
  await getSanctum();
  return await apiClient.post("/api/logout", [], config).then((response) => {
    if (response.status === 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  });
}

export function getTasks(queryParams = "") {
  return apiClient.get("/api/tasks/get" + queryParams, config).then(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 500) {
        forceLogoutUser();
      }
    }
  );
}

const priorityCache = {};
export async function getPriorities() {
  if (!priorityCache.response) {
    const response = await apiClient.get("/api/priorities/index", config);
    priorityCache.response = response;
    return response;
  }
  return priorityCache.response;
}

const categoryCache = {};
export function getCategories() {
  if (!categoryCache.response) {
    const response = apiClient.get("/api/categories/get", config);
    categoryCache.response = response;
    return response;
  }
  return categoryCache.response;
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
      if (error.response.status === 401 || error.response.status === 500) {
        forceLogoutUser();
      }
    }
  );
}

export async function markTaskComplete(id) {
  return await apiClient.post("/api/tasks/complete/" + id, [], config).then(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 500) {
        forceLogoutUser();
      }
    }
  );
}

export async function markTaskPending(id) {
  return await apiClient.post("/api/tasks/pending/" + id, [], config).then(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 500) {
        forceLogoutUser();
      }
    }
  );
}

export async function deleteTask(id) {
  return await apiClient.delete("/api/tasks/delete/" + id, config).then(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 500) {
        forceLogoutUser();
      }
    }
  );
}

export async function updateTask(id, data) {
  return await apiClient.put("/api/tasks/update/" + id, data, config).then(
    (response) => {
      if (response.status === 200) {
        return response.data.data;
      }
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 500) {
        forceLogoutUser();
      }
      return error.response.data;
    }
  );
}
