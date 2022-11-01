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
import KichCoSlice, {
  checkedSize,
  fetchALLSize,
  fillSizes,
} from "~/redux/slices/KichCoSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "~/const";
import ReactHtmlParser from "react-html-parser";
import ColorComponent from "./components/ColorComponent";
import { v4 as uuidv4 } from "uuid";
const { Panel } = Collapse;
const TrangChiTietSanPham = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.SanPham);
  const { id } = useParams();
  console.log({ product });
  useEffect(() => {
    dispatch(Api.fetchGetProduct({ id }));
  }, []);
  const handleAddToCart = () => {
    let CartItem = { ...product };
    CartItem.qty = 1;
    CartItem.color = product.colorSelected;
    CartItem.size = product.sizeSelected;
    console.log({ color: CartItem.color, size: CartItem.size });
    dispatch(AddToCart(CartItem));
  };
  return (
    <div className="ProductDetail">
      <Row>
        <Col className="ProductDsc" xs={{ span: 24 }} xl={{ span: 18 }}>
          <Row>
            <Col className="ProductDscPC" xs={{ span: 0 }} xl={{ span: 24 }}>
              <div className="ImgContainer">
                {product.hinhAnhDisplay &&
                  product.hinhAnhDisplay[0]?.hinhAnhInfo?.map((item) => {
                    return (
                      <Image
                        key={uuidv4()}
                        // src={`${BASE_URL}wwwroot/res/SanPhamRes/Imgs/${product?.maSanPham.trim()}/${
                        //   item.value
                        // }`}
                        src={item.url}
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
              <SizeSelect
                items={
                  product?.sizeDisplay?.length > 0 ? product.sizeDisplay[0] : []
                }
              />
            </span>
            <span>
              <h3>Màu sắc</h3>
              <ColorComponent items={product?.chiTietSoLuong}></ColorComponent>
            </span>

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
