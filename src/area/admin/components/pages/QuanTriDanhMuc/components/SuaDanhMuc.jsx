import React from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Method from "~/axiosRequest/request";
import DanhMucSlice, {
  fetCategoryGetById,
  fetchCategoryUpdate,
} from "~/redux/slices/DanhMuc";
import { useState } from "react";
const { useForm } = Form;
const { Option } = Select;

function SuaDanhMuc() {
  const { maDM } = useParams();
  const [form] = useForm();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.DanhMuc.item);
  const [sexOptions, setSexOptions] = useState([]);
  useEffect(() => {
    form.setFieldsValue({
      Id: item._id,
      Tendanhmuc: item.tenDanhMuc,
      GioiTinhCode: item?.gioiTinh?.value,
    });
  }, [item]);
  useEffect(() => {
    dispatch(fetCategoryGetById(maDM));

    const Fetch = async () => {
      try {
        const res = await Method.Get("api/GioiTinh");
        setSexOptions([...res]);
      } catch (err) {
        console.log(err);
      }
    };
    Fetch();
  }, [maDM]);
  const handleFinish = (value) => {
    dispatch(fetchCategoryUpdate({ id: value.Id, body: value }));
    console.log(value);
  };
  return (
    <>
      <Form
        form={form}
        name="updateForm"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item hidden name={"Id"}></Form.Item>
        <Form.Item label={"Tên danh mục"} name={"Tendanhmuc"}>
          <Input />
        </Form.Item>
        <Form.Item label={"Độ tuổi và giới tính"} name={"GioiTinhCode"}>
          <Select options={sexOptions}></Select>
        </Form.Item>
        <Button htmlType="submit">SUBMIT</Button>
      </Form>
    </>
  );
}

export default SuaDanhMuc;
