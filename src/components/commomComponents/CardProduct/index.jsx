import React from "react";
import { Card } from "antd";
import "./CardProduct.scss";
import { Link } from "react-router-dom";
const CardProduct = ({ value = {} }) => {
  console.log({ value });
  const { maSanPham, tenSanPham, giaBanDisplay, boSuuTap, slug } = value;
  return (
    <Card>
      <Link
        to={`/san-pham/${slug?.trim()}/${maSanPham?.trim()}`}
        className="CardProduct_Content"
      >
        <div className="imgGroup">
          <img
            style={{ height: "100%" }}
            src={
              "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8020d7fee088442d8da2ae2801123818_9366/Giay_Stan_Smith_Pride_trang_GX6394_01_standard.jpg"
            }
          />
          <div className="price">{giaBanDisplay || "9 999 999 đ"}</div>
        </div>
        <div className="CardProduct_mainContent">
          <div className="title">{tenSanPham || "Stanmith Pride"}</div>
          <div className="categoryName">
            {boSuuTap?.value == null
              ? "Chưa thuộc bộ sưu tập nào!"
              : boSuuTap?.value}
          </div>
          <div className="status">mới</div>
        </div>
      </Link>
    </Card>
  );
};

export default CardProduct;
