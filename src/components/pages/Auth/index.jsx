import React from "react";
import "./AuthPage.scss";
import MyButton from "~/components/commomComponents/Button";
import { Link } from "react-router-dom";
const AuthPage = () => {
  return (
    <div className="AuthPage">
      <div className="LoginMethod">
        <Link to={"phoneOTP"}>
          {" "}
          <MyButton>Đăng nhập / Đăng ký với SĐT</MyButton>
        </Link>{" "}
      </div>
      <small>
        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{" "}
        <a href="#">điều khoản sử dụng</a> của chúng tôi.
      </small>
    </div>
  );
};

export default AuthPage;
