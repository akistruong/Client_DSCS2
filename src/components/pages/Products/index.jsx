import React from "react";
import { Table, Button } from "antd";
import "./TrangSanPham.scss";
import Filter from "./components/FilterComponent";
import CardProduct from "~/components/commomComponents/CardProduct";
import SanPhamSlice from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsive: ["lg"],
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    responsive: ["lg"],
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsive: ["lg", "xs"],
  },
];

const TrangSanPham = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.SanPham);
  console.log({ products });
  return (
    <div className="TrangSanPham">
      <div className="Filter">
        <Filter />
      </div>
    </div>
  );
};

export default TrangSanPham;
