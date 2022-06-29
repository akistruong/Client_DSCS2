import * as Method from "~/axiosRequest/request";

export const GetAllCategory = async () => {
  try {
    const res = await Method.Get("/api/admin/DanhMuc");
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
export const GetAllHangMuc = async () => {
  try {
    const res = await Method.Get("/api/ParentCategories");
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetAllCateByParentCat = async () => {
  try {
    const res = await Method.Get("/api/ParentCategories/GetCateByParent");
    return res;
  } catch (err) {
    throw err;
  }
};
