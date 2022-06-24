import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SmileOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import ThemSanPham from "~/area/admin/components/pages/QuanTriSanPham/components/ThemSanPham";
import CapNhatSanPham from "~/area/admin/components/pages/QuanTriSanPham/components/CapNhatSanPham";
import { Delete, Get } from "~/area/admin/components/api/SanPham/";
import { Link, useSearchParams } from "react-router-dom";
const Columns = (setModalDelete) => {
  const handleOpenDelete = (_id) => {
    setModalDelete({ _id, state: true });
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
      key: "giaBanDisplay",
      responsive: ["md", "xs"],
      // sorter: (a, b) => a.giaBan - b.giaBan,
      // sortDirections: ["descend"],
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
            <Button icon={<EditOutlined />} type="primary">
              Sửa
            </Button>
          </Link>

          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => handleOpenDelete(record.maSanPham)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
};
const QuanTriSanPham = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openModalDelete, setModalDelete] = useState({
    _id: null,
    state: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [source, setSource] = useState([]);

  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 5;
  const [pagination, setPagination] = useState({
    current: page,
    pageSize: pageSize,
  });
  const fetchData = async (params) => {
    const { page, pageSize, current } = params;
    try {
      setLoading(true);
      var data = await Get("api/admin/SanPham", {
        pageSize,
        page,
        sortOrder: params.sortOrder,
      });
      setLoading(false);
      var temp = [];
      data.products.forEach((item, index) => {
        temp.push({ key: item.maSanPham, ...item });
      });
      setPagination({
        page,
        pageSize,
        total: data.totalRow,
      });
      setSource(temp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData({ page, pageSize });
  }, []);
  const handleOpenModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };

  const handleOnCancel = () => {
    setOpenModalAdd(false);
  };
  const handleConfirmDelete = async (id) => {
    try {
      const res = await Delete("/api/admin/SanPham/" + id);
      notification.open({
        message: "Xóa thành công",
        description: "Xóa thành công",
        className: "alert-success",
        icon: <SmileOutlined />,
      });
      setModalDelete({ _id: null, state: false });
      let temp = [...source];
      let item = temp.find((x) => x.maSanPham == id);
      if (item) {
        const index = temp.indexOf(item);
        if (index != -1) {
          temp.splice(index, 1);
          setSource(temp);
        }
      }
    } catch (err) {
      notification.open({
        message: err.response.data.title,
        description: err.response.data.message,
        className: "alert-error",
        icon: <IssuesCloseOutlined />,
      });
    }
  };
  const handleTableChange = (params) => {
    console.log({ params });
    setSearchParams({
      page: params.current,
    });
    fetchData({
      page: params.current,
      pageSize: params.pageSize,
      total: params.total,
    });
  };
  return (
    <div className="TrangSanPham">
      <Button type="primary" onClick={handleOpenModalAdd}>
        Thêm sản phẩm
      </Button>
      <Table
        loading={loading}
        onChange={handleTableChange}
        dataSource={source}
        columns={Columns(setModalDelete, handleConfirmDelete)}
        pagination={pagination}
      />
      {/* <FormSanPham visible={openModalAdd} onCancel={handleOnCancel} /> */}
      <ThemSanPham
        visible={openModalAdd}
        onCancel={handleOnCancel}
        setProducts={setSource}
        list={source}
        ModalState={setOpenModalAdd}
      />

      <Modal
        title="Xác nhận xóa sản phẩm"
        visible={openModalDelete.state}
        onCancel={() => setModalDelete(false)}
        onOk={() => handleConfirmDelete(openModalDelete._id)}
      >
        Bạn có chắc muốn xóa sản phẩm?
      </Modal>
    </div>
  );
};

export default QuanTriSanPham;
