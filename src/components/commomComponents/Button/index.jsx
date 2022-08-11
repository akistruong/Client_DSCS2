import React from "react";
import "./Button.scss";
const MyButton = ({ children, ...props }) => {
  return (
    <button className="MyButton" {...props}>
      {children}
    </button>
  );
};

export default MyButton;
