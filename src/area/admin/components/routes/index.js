import HomeAdmin from "~/area/admin/components/pages/HomeAdmin";
import QuanTriDanhMuc from "~/area/admin/components/pages/QuanTriDanhMuc";
import QuanTriSanPham from "~/area/admin/components/pages/QuanTriSanPham";
import CapNhatSanPham from "../pages/QuanTriSanPham/components/CapNhatSanPham";
export const adminRoute = [
  {
    path: "/admin",
    element: HomeAdmin,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-san-pham",
    element: QuanTriSanPham,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-san-pham/chinh-sua/:maSP",
    element: CapNhatSanPham,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-danh-muc",
    element: QuanTriDanhMuc,
    layout: "admin",
  },
];
