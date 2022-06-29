import React, { useEffect, useState } from "react";
import DanhMucSlice, {
  fetchCategoryAll,
  fetchCategoryDelete,
  fetchCategoryAdd,
  fetchGetParentCategory,
} from "~/redux/slices/DanhMuc";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { Form, Table, Select, Button, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import * as Method from "~/axiosRequest/request";
const { Option } = Select;
const column = (params) => {
  const { dispatch, sexOptions } = params;
  const handleDelete = (id) => {
    dispatch(fetchCategoryDelete(id));
  };
  return [
    {
      title: "Tên danh mục",
      dataIndex: "info.tenDanhMuc",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        return (
          <>
            <Button type="primary" key={uuidv4()}>
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
              key={uuidv4()}
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
  const { items, item, loading, hangmucs } = useSelector(
    (state) => state.DanhMuc
  );
  const [sexOptions, setSexOptions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const dispatch = useDispatch();
  console.log({ items });
  useEffect(() => {
    dispatch(fetchCategoryAll());
  }, []);
  const handleFinish = (e) => {
    dispatch(fetchCategoryAdd({ body: e }));
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpenModalAdd(true)}>
        Thêm danh mục
      </Button>
      <Table
        rowKey={uuidv4()}
        loading={loading}
        columns={column({ dispatch, sexOptions, loading })}
        dataSource={items}
      ></Table>
      ;
      <Modal
        visible={openModalAdd}
        cancelText="Hủy"
        okButtonProps={{ hidden: true }}
        onCancel={() => setOpenModalAdd(false)}
      >
        <Form
          initialValues={{
            GioiTinhCode: null,
            parentCategoryID: null,
          }}
          name="AddForm"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item label={"Tên danh mục"} name={"Tendanhmuc"}>
            <Input placeholder="Tên danh mục" />
          </Form.Item>
          <Form.Item label={"Tên hạng mục"} name={"parentCategoryID"}>
            <Select>
              {hangmucs.map((item) => {
                return (
                  <>
                    <Option value={null}>Chọn hạng mục</Option>;
                    <Option value={item.id}>{item.tenHangMuc}</Option>;
                  </>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Phải chọn trường này!",
              },
            ]}
            label={"Độ tuổi và giới tính"}
            name={"GioiTinhCode"}
          >
            <Select>
              <Option value={null}>Chọn giới tính, độ tuổi</Option>
              {sexOptions.map((item) => {
                return (
                  <Option key={uuidv4()} value={item?.value}>
                    {item?.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Button htmlType="submit" loading={loading}>
            Thêm
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default QuanTriDanhMuc;
