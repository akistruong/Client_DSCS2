import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import * as request from "~/axiosRequest/request";
import { useEffect, useState } from "react";
import CardProduct from "~/components/commomComponents/CardProduct";
import { Col, Row } from "antd";
const NewRelease = () => {
  const [producstNew, setProductsNew] = useState([]);
  useEffect(() => {
    const FetchAllNewReleaseProducts = async () => {
      try {
        const res = await request.Get("/api/Home/ProductsLatesUpdate");
        setProductsNew(res);
      } catch (err) {}
    };
    FetchAllNewReleaseProducts();
  }, []);
  return (
    <div>
      <Swiper
        breakpoints={{
          // when window width is >= 640px

          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 4,
          },
          1400: {
            width: 1600,
            slidesPerView: 4,
          },
        }}
        style={{ padding: "1rem" }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        modules={[Pagination]}
        className="mySwiper"
      >
        {producstNew.map((item) => {
          return (
            <SwiperSlide>
              <CardProduct></CardProduct>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default NewRelease;
