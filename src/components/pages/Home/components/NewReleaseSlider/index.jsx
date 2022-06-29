import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Card from "antd/lib/card/Card";
const NewRelease = () => {
  return (
    <div>
      <Swiper
        style={{ padding: "1rem" }}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>adawdd</Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default NewRelease;
