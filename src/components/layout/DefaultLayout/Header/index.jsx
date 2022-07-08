import React from "react";
import UserHeader from "./components/UserHeader";
import "./HeaderMainHome.scss";
import MenuComponent from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/DanhMuc";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ResultCard from "./components/ResultCard";
import CustomSpin from "~/components/CustomSpin";
import shoesLogo from "~/assets/shoesLogo.png";
import {
  SearchOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
function HeaderMainHome() {
  return (
    <div
      className="MainHeader"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="UserHeader">
        <UserHeader />
      </div>
      <div className="SubHeaderForPc">
        <div className="Logo">
          <img src={shoesLogo} alt="" />
        </div>
        <div className="Menu">
          <MenuComponent />
        </div>
        <div className="Actions">
          <div className="Search_Container">
            <div className="content">
              <input
                type="text"
                className="SearchInput"
                placeholder="Tìm kiếm"
              />
              <SearchOutlined className="searchIcon" />
              <CloseOutlined className="closeIcon" />
            </div>
            {/* <div className="SearchResult">
              <h3>SẢN PHẨM</h3>
              <CustomSpin />
            </div> */}
          </div>
          <div className="Cart_Container">
            <ShoppingCartOutlined className="cartIcon" />
          </div>
        </div>
      </div>

      <div className="SubHeaderForMobile">
        <div className="Menu">MenuMOBILE</div>
        <div className="Logo">LOGOMOBILE</div>
        <div className="Action">ACTIONMOBILE</div>
      </div>
    </div>
  );
}

export default HeaderMainHome;
