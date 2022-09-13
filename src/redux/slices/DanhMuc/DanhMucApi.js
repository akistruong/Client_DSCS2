import * as Method from "~/axiosRequest/request";

export const GetAllDanhMucForUI = async () => {
  try {
    const res = await Method.Get("/api/admin/DanhMuc");
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetCategoryByParentId = async (id) => {
  try {
    const res = await Method.Get(
      "/api/admin/DanhMuc/GetDanhMucByParentId/" + id
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetCatById = async (id) => {
  try {
    const res = await Method.Get("/api/admin/DanhMuc/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};
export const UpdateCategory = async (id, body) => {
  try {
    const res = await Method.Put("/api/admin/DanhMuc/" + id, body);
    return res;
  } catch (err) {
    throw err;
  }
};
export const DeleteCategory = async (id) => {
  try {
    const res = await Method.Delete("/api/admin/DanhMuc/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};
export const PostCategory = async (body) => {
  try {
    const res = await Method.Post("/api/admin/DanhMuc/", body);
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetAllDanhMucForAdmin = async () => {
  try {
    const res = await Method.Get("/api/admin/DanhMuc/GetAllDanhMuc");
    return res;
  } catch (err) {
    throw err;
  }
};
