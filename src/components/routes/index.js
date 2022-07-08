import * as Elements from "~/components/pages";

const publicRoute = [
  {
    path: "/",
    element: Elements.Home,
  },
  {
    path: "/:slug",
    element: Elements.TrangSanPham,
  },
  {
    path: "/trang-chi-tiet-san-pham/:slug/:id",
    element: Elements.TrangChiTietSanPham,
  },
];
const privateRoute = [];

export { publicRoute, privateRoute };
