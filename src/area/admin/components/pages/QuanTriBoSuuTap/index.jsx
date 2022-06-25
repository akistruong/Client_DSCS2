import React from "react";
import { Table, Form, Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import BSTSlice, { fetchAllBST } from "~/redux/slices/BoSuuTap";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "~/const/index";
const columns = () => {
  return [
    {
      title: "Tên Bộ sưu tập",
      dataIndex: "tenBoSuuTap",
      key: uuidv4(),
    },
    {
      title: "Hình ảnh",
      dataIndex: "Img",
      key: uuidv4(),
      render: (e) => {
        return e == null ? (
          <p>Hãy cập nhật ảnh</p>
        ) : (
          <Image width={200} src={`${BASE_URL}res/BstImgs/${e}`} />
        );
      },
    },
    {
      title: "Hành động",
      key: uuidv4(),
      render: () => {
        return (
          <>
            {" "}
            <Button>Quản lý sản phẩm</Button>
            <Button>Chỉnh sửa</Button>
            <Button type="primary" danger>
              Xóa
            </Button>
          </>
        );
      },
    },
  ];
};
const QuanTriBST = () => {
  const dispatch = useDispatch();
  const { boSuuTaps, boSuuTap, loading } = useSelector(
    (state) => state.BoSuuTap
  );
  console.log({ boSuuTaps, boSuuTap, loading });
  useEffect(() => {
    dispatch(fetchAllBST({}));
  }, []);
  return (
    <>
      <Button type="primary">Thêm bộ sưu tập</Button>
      <Table
        key={uuidv4()}
        rowKey={uuidv4()}
        columns={columns()}
        dataSource={boSuuTaps}
      ></Table>
    </>
  );
};

export default QuanTriBST;
