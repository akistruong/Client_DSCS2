import React from "react";
import { Checkbox } from "antd";
import "./colorOptions.scss";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const ColorOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const items = [
    {
      label: "Đỏ",
      value: "ff0000",
    },
    {
      label: "Hồng",
      value: "pink",
    },
    {
      label: "Vàng",
      value: "yellow",
    },
  ];
  let checkedItems = searchParams.getAll("color");
  const handleCheckBox = (e) => {
    setSearchParams({
      sort: searchParams.get("sort") || "",
      size: searchParams.getAll("size") || "",
      color: [...e],
    });
  };
  const handleDefaultChecked = (e) => {
    let status = checkedItems.find((x) => x == e.target.value);
    console.log({ e });
    if (status) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Checkbox.Group
      defaultValue={checkedItems}
      onChange={handleCheckBox}
      options={items}
    >
      {" "}
    </Checkbox.Group>
  );
};

export default ColorOptions;
