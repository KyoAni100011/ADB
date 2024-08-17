import axios from "axios";

// Fetch environment variables using `import.meta.env` in a browser environment
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: `${VITE_SERVER_URL}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to header if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
