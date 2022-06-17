import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Get, Post } from "~/area/admin/components/api/SanPham";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { Option } = Select;

const ThemSanPham = ({
  visible,
  onOK,
  onCancel,
  setProducts,
  list,
  ModalState,
}) => {
  const [formBody, setFormBody] = useState({});
  const [bst, setBst] = useState([]);
  const [cate, setCate] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBst = async () => {
      const res = await Get("/api/admin/BoSuuTap");
      setBst(res);
    };
    getBst();
  }, []);
  useEffect(() => {
    const getDM = async () => {
      const res = await Get("/api/admin/DanhMuc");
      setCate(res);
    };
    getDM();
  }, []);

  const handleSubmit = (values) => {
    const postData = async () => {
      setLoading(true);
      var res = await Post("/api/admin/SanPham", values);
      var temp = [];
      setProducts([...list, { key: res.id, ...res }]);
      setLoading(false);
      ModalState(false);
    };
    postData();
  };
  return (
    <Modal
      width={800}
      title="Thêm sản phẩm"
      visible={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Mã sản phẩm"
          name="MaSanPham"
          rules={[
            {
              required: true,
              message: "Hãy nhập trường này",
            },
          ]}
        >
          <Input placeholder="Mã sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="TenSanPham"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá bán"
          name="GiaBan"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <InputNumber placeholder="Số lượng" />
        </Form.Item>
        <Form.Item
          label="Số lượng nhập"
          name="SoLuongNhap"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Tên bộ sưu tập"
          name="IdBst"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trường này",
            },
          ]}
        >
          <Select placeholder="Chọn bộ sưu tập">
            {bst.map((item, index) => {
              return (
                <Option key={index} value={item.id}>
                  {item.tenBoSuuTap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Tên danh mục"
          name="IdDM"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trường này",
            },
          ]}
        >
          <Select placeholder="Chọn tên danh mục">
            {cate.map((item, index) => {
              return (
                <Option key={"DM" + index} value={item.id}>
                  {item.tenDanhMuc}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <CKEditor
          editor={ClassicEditor}
          onChange={(e, editor) => console.log(e, editor.getData())}
        />

        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ display: "block" }}
          onClick={handleSubmit}
          loading={loading}
        >
          Hoàn tất thêm
        </Button>
      </Form>
    </Modal>
  );
};

export default ThemSanPham;
