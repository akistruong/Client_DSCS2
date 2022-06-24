import axios from "axios";
const request = axios.create({
  baseURL: "https://localhost:44328/",
});
request.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("access__token");
  console.log(accessToken);
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});
export const Get = async (path, params) => {
  const response = await request.get(path, { params });
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
