import axios from "axios";

const $axios = axios.create({
  baseURL: "https://test-task-api.allfuneral.com/",
});

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      return Promise.reject({
        errorText: "Ошибка авторизации",
        status: 401,
        method: error.config?.url,
      });
    } else if (error.response.status === 400) {
      if (error.response.data) {
        return Promise.reject({
          errorText: error.response.data,
          status: 400,
          method: error.config?.url,
        });
      } else if (error.response.data === Array) {
        return Promise.reject({
          errorText: error.response.data[0],
          status: 400,
        });
      } else {
        return Promise.reject({
          errorText: "Неизвестная ошибка",
          status: 400,
          method: error.config?.url,
        });
      }
    } else if (error.response.status === 500) {
      return Promise.reject({
        errorText: "Ошибка Сервера",
        status: 500,
        method: error.config?.url,
      });
    } else {
      return Promise.reject({
        errorText: "Неизвестная ошибка",
        status: error.response?.status,
        method: error.config?.url,
      });
    }
  }
);
$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $axios;
