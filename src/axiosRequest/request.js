import axios from "axios";
export const request = axios.create({
  baseURL: "https://localhost:44328/",
});

export const get = async (path, params) => {
  const response = await request.get(path, { params });
  return response.data;
};
