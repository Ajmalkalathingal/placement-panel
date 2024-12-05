import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// instance of axios
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN); 
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh: refreshToken }
        ); 

        const newAccessToken = response.data.access;

        Cookies.set(ACCESS_TOKEN, newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Use new token here
        return axios(originalRequest);
      } catch (refreshError) {
        console.error(
          "Token refresh failed:",
          refreshError.response
            ? refreshError.response.data
            : refreshError.message
        );
        console.error("Refresh Error Details:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Add the update method
api.update = (url, data, config) => {
  return api.patch(url, data, config);
};
api.put = (url, data, config) => {
  return api.patch(url, data, config);
};

export default api;
