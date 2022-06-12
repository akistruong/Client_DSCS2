import React from "react";
import { Table, Button } from "antd";
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
  return (
    <div className="TrangSanPham">
      <Button type="primary">Thêm sản phẩm</Button>
      {/* <Table dataSource={dataSource} columns={columns} /> */}
    </div>
  );
};

export default TrangSanPham;
