import * as request from "~/axiosRequest/request";

export const GetAllBST = async (params) => {
  try {
    const res = await request.Get("/api/admin/BoSuuTap", params);
    return res;
  } catch (err) {
    throw err;
  }
};
// export const GetProductByBST = async()=>
// {

// }
export const GetBSTById = async (id) => {
  try {
    const res = await request.Get("/api/admin/BoSuuTap/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};
export const PostBST = async (body) => {
  try {
    const res = await request.Post("/api/admin/BoSuuTap", body);
    return res;
  } catch (err) {
    throw err;
  }
};
export const PutBST = async (id, body) => {
  try {
    const res = await request.Put("/api/admin/BoSuuTap/" + id, body);
    return res;
  } catch (err) {
    throw err;
  }
};

export const DeleteBST = async (id) => {
  try {
    const res = await request.Delete("/api/admin/BoSuuTap/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};