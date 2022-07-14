import { Col, Row } from "antd";
import React from "react";
import "./SizeSelect.scss";
import { v4 as uuidv4 } from "uuid";
import KichCoSlice, {
  checkedSize,
  fetchALLSize,
} from "~/redux/slices/KichCoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const SizeRadio = ({ label, value, checked = false, onChange }) => {
  const dispatch = useDispatch();
  const { sizes, sizeChecked } = useSelector((state) => state.KichCo);
  return (
    <div className="SizeRadio">
      <input
        id={value}
        type={"radio"}
        name={"checkboxGroup"}
        defaultValue={value}
        defaultChecked={sizeChecked == value ? true : false}
        onChange={onChange}
      />
      <label htmlFor={value}>{label || 35}</label>
    </div>
  );
};
const SizeSelect = ({ setSize }) => {
  const dispatch = useDispatch();
  const { sizes } = useSelector((state) => state.KichCo);
  console.log({ sizes });
  useEffect(() => {
    dispatch(fetchALLSize());
  }, []);

  return (
    <Row gutter={10}>
      {sizes?.map((item) => {
        return (
          <Col key={uuidv4()} span={6}>
            {" "}
            <SizeRadio
              label={item.label}
              value={item.value}
              checked={item.checked || false}
              onChange={(e) => dispatch(checkedSize(e.target.value))}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default SizeSelect;
