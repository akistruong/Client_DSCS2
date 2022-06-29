import React from "react";
import UserHeader from "./components/UserHeader";
import "./HeaderMainHome.scss";
import MenuComponent from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/DanhMuc";
import { useEffect } from "react";
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
        <div className="Logo">Logo</div>
        <div className="Menu">
          <MenuComponent />
        </div>
        <div className="Actions">Actions</div>
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
