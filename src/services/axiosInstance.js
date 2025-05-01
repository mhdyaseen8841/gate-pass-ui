import axios from "axios";

// export const baseURL = `http://localhost:4000/api`;
// export const baseURL = `http://172.20.10.3:4000/api`;
// test 
export const baseURL = `http://192.168.8.151:4000/api`;
  // process.env.REACT_APP_API_URL || `http://localhost:4000/api`;

//headers: defaultHeaders
const createAxiosInstance = (baseURL, defaultHeaders = {}) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders,
    },
    withCredentials: true,
  });

  setupInterceptors(instance); // Apply interceptors after creating the instance
  return instance;
};

// Function to setup interceptors
const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
       localStorage.clear();
        window.location.href = '/login'; 
      }
      return Promise.reject(error);
    },
  );
};


export const USER_INSTANCE = createAxiosInstance(`${baseURL}/users/`, {
  "Content-Type": "application/json",
  withCredentials: true,
  credentials: "include",
});



export const VISITOR_INSTANCE = createAxiosInstance(
  `${baseURL}/`,
  {
    "Content-Type": "application/json",
  }
);

