import axios from "axios"
import { ACCESS_TOKEN,REFRESH_TOKEN } from "./constant"
import { toast } from "react-toastify";

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:8000', 
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle expired tokens
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error status is 401 (Unauthorized)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // Mark the request as retrying

            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (refreshToken) {
                try {
                    const tokenResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
                        refresh: refreshToken,
                    });

                    const newAccessToken = tokenResponse.data.access;
                    localStorage.setItem(ACCESS_TOKEN, newAccessToken); 

                    // Update the Authorization header and retry the original request
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);  // Retry the original request with the new token

                } catch (err) {
                    // If refresh token fails, log the user out and redirect to login
                    toast.error("Session expired. Please log in again.");
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    window.location.href = '/login'; 
                }
            } else {
                // No refresh token available, log the user out
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = '/login';  // Redirect to login page
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



