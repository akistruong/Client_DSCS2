import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import UploadSingleFile from "./UploadSingleFile";
import UploadMutipleFile from "./UploadMutipleFile";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Get, Post, Delete } from "~/area/admin/components/api/SanPham";
import { useForm } from "antd/lib/form/Form";
const { Option } = Select;
document.title = "Trang cập nhật thông tin sản phẩm";
const CapNhatSanPham = ({
  visible,
  onOK,
  onCancel,
  setProducts,
  list,
  ModalState,
}) => {
  const [init, setInit] = useState({});
  const [formBody, setFormBody] = useState({});
  const [bst, setBst] = useState([]);
  const [cate, setCate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [mutipleFileInit, setMutipleFileInit] = useState([]);
  console.log(mutipleFileInit);
  let { maSP } = useParams();
  let [form] = useForm();
  useLayoutEffect(() => {
    const Fetch = async () => {
      var res = await Get("/api/admin/SanPham/" + maSP);
      form.setFieldsValue({
        IdDM: res.danhMuc.key,
        IdBst: res.boSuuTap.key,
        ...res,
      });
      if (res.img) {
        setFileList([
          {
            uid: res.img,
            name: res.img,
            status: "done",
            // custom error message to show
            url:
              "https://localhost:44328/wwwroot/res/SanPhamRes/Thumb/" + res.img,
          },
        ]);
      }

      var filesTemp = [];
      if (res.hinhAnh) {
        res.hinhAnh.forEach((item) => {
          filesTemp.push({
            uid: item.key,
            name: item.value,
            status: "done",
            // custom error message to show
            url:
              "https://localhost:44328/wwwroot/res/SanPhamRes/Imgs/" +
              maSP +
              "/" +
              item.value,
          });
        });
        setMutipleFileInit(filesTemp);
      }
    };
    Fetch();
  }, [init]);
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
    console.log(values);
  };
  return (
    <div
      className="Wrapper"
      style={{
        padding: "1rem",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Form
        name="FormChinhSuaSanPham"
        form={form}
        colon={false}
        initialValues={init}
        layout="vertical"
        onFinish={handleSubmit}
        labelCol={{
          span: 32,
        }}
        wrapperCol={{
          span: 32,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {console.log(init)},
        <Form.Item
          label="Mã sản phẩm"
          name="maSanPham"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Tên sản phẩm"
          name="tenSanPham"
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
          name="giaBan"
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
          label="Số lượng nhập"
          name="soLuongNhap"
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
        <Form.Item label="Ảnh Thumbnail" name="img">
          <UploadSingleFile
            maSP={maSP}
            fileInit={fileList}
            setFileInit={setFileList}
            fieldValue={form.setFieldsValue}
          />
        </Form.Item>
        <Form.Item label="Ảnh sản phẩm">
          <UploadMutipleFile
            maSP={maSP}
            fileInit={mutipleFileInit}
            setFileInit={setMutipleFileInit}
            fieldValue={form.setFieldsValue}
          />
        </Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ display: "block" }}
          onClick={handleSubmit}
          loading={loading}
        >
          Hoàn tất cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default CapNhatSanPham;
