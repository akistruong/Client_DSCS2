import React, { useState } from "react";
import "./ProductDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import {
  Col,
  Row,
  Image,
  Collapse,
  Space,
  Rate,
  Button,
  Breadcrumb,
} from "antd";
import { Pagination } from "swiper";
import SizeSelect from "./components/SizeCompoent";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRightOutlined } from "@ant-design/icons";
import * as Api from "~/redux/slices/SanPham";
import * as ApiSize from "~/redux/slices/KichCoSlice";
import GioHangSlice, {
  ViewCart,
  AddToCart,
} from "~/redux/slices/GioHang/GioHangSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "~/const";
import ReactHtmlParser from "react-html-parser";
import { v4 as uuidv4 } from "uuid";
const { Panel } = Collapse;
const TrangChiTietSanPham = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.SanPham);
  const { sizes, sizeChecked } = useSelector((state) => state.KichCo);
  const { id } = useParams();
  console.log({ sizeChecked });
  useEffect(() => {
    dispatch(Api.fetchGetProduct({ id }));
  }, []);
  const handleAddToCart = () => {
    let CartItem = { ...product };
    CartItem.qty = 1;
    CartItem.size = Number(sizeChecked);
    dispatch(AddToCart(CartItem));
  };
  return (
    <div className="ProductDetail">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col className="ProductDsc" xs={{ span: 24 }} xl={{ span: 18 }}>
          <Row>
            <Col className="ProductDscPC" xs={{ span: 0 }} xl={{ span: 24 }}>
              <div className="ImgContainer">
                {product?.hinhAnh?.map((item) => {
                  return (
                    <Image
                      key={uuidv4()}
                      src={`${BASE_URL}wwwroot/res/SanPhamRes/Imgs/${product?.maSanPham.trim()}/${
                        item.value
                      }`}
                      preview
                    />
                  );
                })}
              </div>
            </Col>
            <Col
              xl={{ span: 0 }}
              xs={{ span: 24 }}
              className="ProductDscMobile"
            >
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
              >
                {product?.hinhAnh?.map((item) => {
                  return (
                    <SwiperSlide>
                      <Image
                        src={`${BASE_URL}wwwroot/res/SanPhamRes/Imgs/${product?.maSanPham.trim()}/${
                          item.value
                        }`}
                        preview
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
          </Row>
          <Collapse style={{ wordBreak: "break-all" }}>
            <Panel header="Mô tả">{ReactHtmlParser(product?.mota)}</Panel>
          </Collapse>
        </Col>
        {/* <Col xl={{ span: 0 }}></Col> */}

        <Col span={24} xl={{ span: 6 }}>
          <Space className="ProductInfo" direction="vertical">
            <Space className="InfoHeader">
              <div className="InforHeader_ClsName">
                {product?.boSuuTap?.value || "Chưa thuộc bộ sưu tập nào"}
              </div>
              <div className="InforHeader_Star">
                {" "}
                <Rate disabled value={5} />{" "}
              </div>
            </Space>
            <h1 className="InfoTitle">
              {product?.tenSanPham || "GIÀY SUPERSTAR TAEGEUKDANG"}
            </h1>
            <h2 className="InfoPrice">
              {product?.giaBanDisplay || "2.800.000₫"}{" "}
            </h2>
            <span>
              <h3>Kích cỡ</h3>
            </span>
            <SizeSelect items={sizes} />
            <button className="AddToCart" onClick={handleAddToCart}>
              <strong>THÊM VÀO GIỎ HÀNG</strong>
              <ArrowRightOutlined />
            </button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default TrangChiTietSanPham;
