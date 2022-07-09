import { Drawer } from "antd";
import React from "react";

const MenuMobile = ({ menuMobileOpen, setMenuMobileOpen }) => {
  return (
    <Drawer
      visible={menuMobileOpen}
      onClose={() => setMenuMobileOpen(false)}
      placement="left"
      className="MenuMobile"
    >
      MenuMobile
    </Drawer>
  );
};

export default MenuMobile;
