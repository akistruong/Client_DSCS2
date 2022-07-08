import React, { useEffect, useState } from "react";
import DanhMucSlice, * as Api from "~/redux/slices/DanhMuc";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { Form, Table, Select, Button, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import * as Method from "~/axiosRequest/request";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const { Option, OptGroup } = Select;

const column = (params) => {
  const { dispatch, sexOptions } = params;
  const handleDelete = (id) => {
    dispatch(Api.fetchCategoryDelete(id));
  };
  return [
    {
      title: "Tên danh mục",
      dataIndex: "tenDanhMuc",
      key: "tenDanhMuc",
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
              onClick={() => handleDelete(value.id)}
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
  const { items, item, loading } = useSelector((state) => state.DanhMuc);
  const [sexOptions, setSexOptions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [categoryOtp, setCategoryOpt] = useState([]);
  const dispatch = useDispatch();
  console.log({ items });
  useEffect(() => {
    dispatch(Api.fetchCategoryAll());
  }, []);
  const handleFinish = (e) => {
    const parentId = e.parentCategoryID2
      ? e.parentCategoryID2
      : e.parentCategoryID;
    const customParams = {
      tenDanhMuc: e.tenDanhMuc,
      parentCategoryID: parentId,
    };
    console.log({ customParams });
    dispatch(Api.fetchCategoryAdd({ body: customParams }));
  };
  const handleChange = async (e) => {
    console.log({ e });
    try {
      const res = await Method.Get("/api/admin/DanhMuc/" + e);
      setCategoryOpt([...res.children]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpenModalAdd(true)}>
        Thêm danh mục
      </Button>
      <Table
        loading={loading}
        columns={column({ dispatch, sexOptions, loading })}
        dataSource={items.danhmucs}
        rowKey={uuidv4()}
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
            parentCategoryID: 0,
          }}
          name="AddForm"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item label={"Tên danh mục"} name={"tenDanhMuc"}>
            <Input placeholder="Tên danh mục" />
          </Form.Item>
          <Form.Item label={"Mục mức 0"} name={"parentCategoryID"}>
            <Select onChange={handleChange}>
              <Option value={0}>Mục gốc (0)</Option>
              {items?.menu?.map((item) => {
                return (
                  <Option key={uuidv4()} value={item.info.id}>
                    {item.info.tenDanhMuc}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {categoryOtp?.length > 0 && (
            <Form.Item label={"Mục mức 1"} name={"parentCategoryID2"}>
              <Select key={uuidv4()}>
                <Option value={0}>Mục gốc (0)</Option>
                {categoryOtp?.map((item) => {
                  return (
                    <Option key={uuidv4()} value={item.id}>
                      {item.tenDanhMuc}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}

          <Button htmlType="submit" loading={loading}>
            Thêm
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default QuanTriDanhMuc;
