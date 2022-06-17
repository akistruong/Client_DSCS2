import React, { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ThemSanPham from "~/area/admin/components/pages/QuanTriSanPham/components/ThemSanPham";
import CapNhatSanPham from "~/area/admin/components/pages/QuanTriSanPham/components/CapNhatSanPham";
import { get } from "~/axiosRequest/request";
import { Link } from "react-router-dom";
const Columns = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const HandleOpenEdit = () => {
    setOpenModalEdit(true);
  };

  const handleOnCancel = () => {
    setOpenModalEdit(false);
  };
  return [
    {
      title: "Mã Sản Phẩm",
      dataIndex: "maSanPham",
      key: "maSanPham",
      responsive: ["md", "xs"],
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      responsive: ["md", "xs"],
    },
    {
      title: "Giá bán",
      dataIndex: "giaBanDisplay",
      key: "giaBan",
      responsive: ["md", "xs"],
    },
    {
      title: "Số lượng nhập",
      dataIndex: "soLuongNhap",
      key: "soLuongNhap",
      responsive: ["md", "xs"],
    },
    {
      title: "Số lượng tồn",
      dataIndex: "soLuongTon",
      key: "soLuongTon",
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      responsive: ["md"],
      render: (_, record) => (
        <Space size="middle">
          <Link to={"chinh-sua/" + record.maSanPham}>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={HandleOpenEdit}
            >
              Sửa
            </Button>
          </Link>

          <Button icon={<DeleteOutlined />} type="primary" danger>
            Xóa
          </Button>
          {/* <CapNhatSanPham
            visible={openModalEdit}
            onCancel={handleOnCancel}
            init={record}
          /> */}
        </Space>
      ),
    },
  ];
};
const QuanTriSanPham = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [source, setSource] = useState([]);
  console.log({ source });
  useEffect(() => {
    const fetchData = async () => {
      var data = await get("api/admin/SanPham", {
        pageSize: 5,
      });
      var temp = [];
      data.forEach((item, index) => {
        temp.push({ key: item.maSanPham, ...item });
      });
      setSource(temp);
    };
    fetchData();
  }, []);
  const handleOpenModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };
  const handleOpenModalEdit = () => {
    setOpenModalAdd(!openModalEdit);
  };
  const handleOnCancel = () => {
    setOpenModalAdd(false);
  };
  return (
    <div className="TrangSanPham">
      <Button type="primary" onClick={handleOpenModalAdd}>
        Thêm sản phẩm
      </Button>
      <Table
        dataSource={source}
        columns={Columns()}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {}, // click row
          };
        }}
      />
      {/* <FormSanPham visible={openModalAdd} onCancel={handleOnCancel} /> */}
      <ThemSanPham
        visible={openModalAdd}
        onCancel={handleOnCancel}
        setProducts={setSource}
        list={source}
        ModalState={setOpenModalAdd}
      />
    </div>
  );
};

export default QuanTriSanPham;
