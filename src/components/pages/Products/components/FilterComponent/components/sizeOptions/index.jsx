import { Select, Checkbox } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
const options = [
  {
    label: "35",
    value: "2",
  },

  {
    label: "36",
    value: "1",
  },
];
const SizeOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.getAll("size");
  console.log({ size });
  const handleChange = (e) => {
    searchParams.append("size", e);
    let newQuery = [];
    setSearchParams({
      sort: searchParams.get("sort"),
      size: e,
      color: searchParams.getAll("color"),
    });
  };
  return (
    <Checkbox.Group
      defaultValue={size}
      options={options}
      onChange={handleChange}
    ></Checkbox.Group>
  );
};

export default SizeOptions;
