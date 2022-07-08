import React from "react";
import { Card } from "antd";
import "./CardProduct.scss";
import { Link } from "react-router-dom";
const CardProduct = ({ height }) => {
  console.log(height);
  return (
    <Card>
      <Link to="/" className="CardProduct_Content">
        <div className="imgGroup">
          <img
            style={{ height: height || "100%" }}
            src={
              "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8020d7fee088442d8da2ae2801123818_9366/Giay_Stan_Smith_Pride_trang_GX6394_01_standard.jpg"
            }
          />
          <div className="price">2.500.000 vnđ</div>
        </div>
        <div className="CardProduct_mainContent">
          <div className="title">Stanmith Pride</div>
          <div className="categoryName">original</div>
          <div className="status">mới</div>
        </div>
      </Link>
    </Card>
  );
};

export default CardProduct;
