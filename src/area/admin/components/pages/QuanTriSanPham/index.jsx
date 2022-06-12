import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ThemSanPham from "./ThemSanPham";
const dataSource = [
  {
    key: "1",
    MaSanPham: "Mike",
    TenSanPham: "John",
  },
  {
    key: "2",
    MaSanPham: "Mike",
    TenSanPham: "John",
  },
];

const columns = [
  {
    title: "Mã Sản Phẩm",
    dataIndex: "MaSanPham",
    key: "MaSanPham",
  },
  {
    title: "Tên Sản Phẩm",
    dataIndex: "TenSanPham",
    key: "TenSanPham",
  },
  {
    title: "Giá bán",
    dataIndex: "GiaBan",
    key: "GiaBan",
  },
  {
    title: "Số lượng nhập",
    dataIndex: "SoLuongNhap",
    key: "SoLuongNhap",
  },
  {
    title: "Số lượng bán",
    dataIndex: "SoLuongBan",
    key: "SoLuongBan",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} type="primary">
          Sửa
        </Button>
        <Button icon={<DeleteOutlined />} type="primary" danger>
          Xóa
        </Button>
      </Space>
    ),
  },
];
const QuanTriSanPham = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleOpenModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };
  const handleOnOkAdd = () => {
    setOpenModalAdd(false);
  };
  return (
    <div className="TrangSanPham">
      <Button type="primary" onClick={handleOpenModalAdd}>
        Thêm sản phẩm
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <ThemSanPham visible={openModalAdd} onCancel={handleOnOkAdd} />
    </div>
  );
};

export default QuanTriSanPham;
