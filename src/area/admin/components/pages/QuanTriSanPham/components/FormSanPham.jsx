import React, { useState } from "react";
import { Modal, Button, Checkbox, Form, Input,Select, InputNumber, Upload } from "antd";
import {UploadOutlined} from "@ant-design/icons"
const {Option} = Select;

const FormSanPham = ({initValues, visible, onOK, onCancel,isUpdateForm }) => {
  const [formBody,setFormBody] = useState({});
  console.log({formBody})
  const handleSubmit=(values)=>
  {
    console.log(values.file.file)
    setFormBody({fileData:values.file.file,...values});
  }
  return (
    <Modal
      title="Thêm sản phẩm"
      visible={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form
      initialValues={initValues}
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
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
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
           <Input/>
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
           <InputNumber/>
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
           <InputNumber/>
        </Form.Item>
         <Form.Item
          label="Tên bộ sưu tập"
          name="IdBst"
          rules={[
            {
              required:true,
              message: "Vui lòng chọn trường này",
            },
          ]}
         
        > 
                     <Select placeholder="Chọn nhà sưu tập">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
            </Form.Item>
            <Form.Item
          label="Tên danh mục"
          name="IdDM"
          rules={[
            {
              required:true,
              message: "Vui lòng chọn trường này",
            },
          ]}
         
        > 
                     <Select placeholder="Chọn nhà sưu tập">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm" name="file">
              <Upload  name="file" action={"localhost:3450/"} onChange={(info)=>console.log(info)} onRemove={(e)=>alert("Removed!")}>
              <Button icon={<UploadOutlined />}>Chọn ảnh tải lên</Button>
              </Upload>
            </Form.Item>
          <Button  block type="primary"  htmlType="submit" style={{display:"block"}}>
            Submit
          </Button>
      </Form>
    </Modal>
  );
};

export default FormSanPham;
