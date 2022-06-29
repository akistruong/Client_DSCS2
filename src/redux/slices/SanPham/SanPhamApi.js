import * as Method from "~/axiosRequest/request";
export const GetAllProducts = async (params) => {
  try {
    const res = await Method.Get("/api/admin/SanPham", params);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetProductById = async (id) => {
  try {
    const res = await Method.Get(`/api/admin/SanPham/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
export const PostProduct = async (body, config) => {
  try {
    const res = await Method.Post("/api/admin/SanPham", body, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const PutProduct = async (id, body, config) => {
  try {
    const res = await Method.Put(`/api/admin/SanPham/${id}`, body, config);
    return res;
  } catch (error) {
    throw error;
  }
};
export const DeleteProduct = async (id) => {
  try {
    const res = await Method.Delete(`/api/admin/SanPham/${id}`);
  } catch (error) {
    throw error;
  }
};
export const UpdateCategory = async ()=>
{
  
}