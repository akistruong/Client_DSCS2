import axios from "axios";
import { BASE_URL } from "~/const";
const request = axios.create({
  baseURL: "https://localhost:44328/",
});
request.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("access__token");
  // console.log(accessToken);
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});
request.interceptors.response.use(
  (response) => {
    const { code, auto } = response.data;
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const refresh__token = localStorage.getItem("refresh__token");
      if (refresh__token) {
        alert("TIEN HANH THAY TOKEN");
        localStorage.setItem("access__token", refresh__token);
        localStorage.removeItem("refresh__token");
        const config = error.response.config;
        config.headers["authorization"] = `Bearer ${refresh__token} `;
        config.baseURL = BASE_URL;
        return request(config);
      }
      // console.log('get new token using refresh token', getLocalRefreshToken())
      // return refreshToken().then(rs => {
      //     console.log('get token refreshToken>>', rs.data)
      //     const { token } = rs.data
      //     instance.setToken(token);
      //     const config = response.config
      //     config.headers['x-access-token'] = token
      //     config.baseURL = BASE_URL
      //     return instance(config)
      // })
    }
    // return Promise.reject(error)
    if (error.response) {
      throw error.response.data;
    } else {
      return Promise.reject(error);
    }
  }
);
export const Get = async (path, config) => {
  const response = await request.get(path,config);
  return response.data;
};
export const Post = async (path, body, config) => {
  const response = await request.post(path, body, config);
  return response.data;
};

export const Put = async (path, body, config) => {
  const response = await request.put(path, body, config);
  return response.data;
};

export const Delete = async (path, config) => {
  const response = await request.delete(path, config);
  return response.data;
};
export { request };
