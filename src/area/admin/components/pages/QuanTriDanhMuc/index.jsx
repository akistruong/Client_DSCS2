import React, { useEffect } from "react";
import DanhMucSlice, {
  fetchCategoryAll,
  fetchCategoryDelete,
} from "~/redux/slices/DanhMuc";
import { useSelector, useDispatch } from "react-redux";
import { Form, Table, Select, Button } from "antd";
import { Link } from "react-router-dom";
const { Option } = Select;
const column = (dispatch) => {
  const handleDelete = (id) => {
    dispatch(fetchCategoryDelete(id));
  };
  return [
    {
      title: "Tên danh mục",
      dataIndex: "tenDanhMuc",
      key: "tenDanhMuc",
    },
    {
      title: "Giới tính và độ tuổi",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      render: (value) => (
        <Select value={value.value}>
          <Option value={value.value}>{value.label}</Option>
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        console.log({ value });
        return (
          <>
            <Button type="primary">
              <Link
                to={`/admin/trang-quan-tri-danh-muc/chinh-sua/${value._id}`}
              >
                Cập nhật
              </Link>
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(value._id)}
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];
};
const QuanTriDanhMuc = () => {
  const { items, item, loading } = useSelector((state) => state.DanhMuc);
  console.log(items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoryAll());
  }, []);
  return (
    <>
      <Button type="primary">Thêm danh mục</Button>
      <Table columns={column(dispatch)} dataSource={items}></Table>;
      <Modal></Modal>
    </>
  );
};

export default QuanTriDanhMuc;
