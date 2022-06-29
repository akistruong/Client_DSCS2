import Item from "antd/lib/list/Item";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Api from "~/redux/slices/DanhMuc";
import "./Menu.scss";
const ItemMenu = (params) => {
  const { item, items } = params;
  console.log({ item, items });
  return (
    <div className="Item">
      <h3 className="Label">
        <Link to={`danh-muc/${item.slug}`}>
          {item.tenDanhMuc.toUpperCase()}
        </Link>
      </h3>
      <div className="Dropdown">
        {items.map((item) => {
          return (
            <div className="DropdownGroup">
              <ul className="Dropdown__Item">
                <h4>
                  {" "}
                  <Link to={`/danh-muc/${item.info.slug}`}>
                    {item.info.tenDanhMuc.toUpperCase()}
                  </Link>
                </h4>
              </ul>
              <ul className="Element">
                {item.children.map((child) => {
                  return (
                    <li>
                      <Link to={`/danh-muc/${child.slug}`}>
                        {child.tenDanhMuc}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const MenuComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.DanhMuc);
  console.log({ items });
  useEffect(() => {
    dispatch(Api.fetchCategoryAll());
  }, []);
  return (
    <div className="MenuComponent">
      {items.map((item) => {
        return <ItemMenu item={item.info} items={item.children}></ItemMenu>;
      })}
    </div>
  );
};
export default MenuComponent;
