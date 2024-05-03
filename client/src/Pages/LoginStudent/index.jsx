import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import image from "../../Assets/imageSchool.jpg";
import logo from "../../Assets/logo.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        "http://localhost:5000/api/account/login",
        {
          email: email,
          password: password,
        }
      );
      var token = result.data;
      var tokenString = JSON.stringify(token);
      if (result.status === 200) {
        localStorage.setItem("auth", tokenString);
        toast.loading("Loading...");
        setTimeout(() => {
          toast.success("Đăng nhập thành công !");
        }, 1000);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      toast.error("Email hoặc mật khẩu không đúng !");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
          loading: {
            duration: 500,
            theme: {
              primary: "yellow",
              secondary: "black",
            },
          },
        }}
      />
      <div className="login">
        <div className="leftSideOfScreen">
          <img src={image} alt="" className="image" />
        </div>
        <div className="rightSideOfScreen">
          <div className="login-form">
            <img src={logo} alt="" className="logo" />
            <h1>DÀNH CHO NGƯỜI HỌC</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Nhập email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="note">
                <p onClick={showModal}>Xem hướng dẫn</p>
                <a href="#">Đăng nhập cho Giảng viên tại đây !</a>
              </div>
              <button className="login-btn" type="submit">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
        <Modal
          title="Hướng dẫn đăng nhập"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          closeIcon={false}
          footer={null}
          style={{
            marginTop: "10%",
          }}
        >
          <p>
            <ol>
              <li>Sinh viên, học viên đăng nhập bằng cách: </li>
              <ol>
                <p>
                  - Sử dụng tài khoản Sinh viên (tại trang
                  <a href="https://dau.edu.vn" target="blank">
                    {" "}
                    https://dau.edu.vn
                  </a>
                  ) để đăng nhập.
                </p>
                <p>- Sử dụng Email DAU (@dau.edu.vn) để đăng nhập.</p>
              </ol>
              <li>Lưu ý:</li>
              <ol>
                <p>- Sinh viên quên tài khoản và mật khẩu:</p>
                <ol>
                  <p>
                    + Sinh viên liên hệ với Phòng Đào tạo để được cấp lại tài
                    khoản và mật khẩu.
                  </p>
                </ol>
              </ol>
            </ol>
          </p>
        </Modal>
      </div>
    </>
  );
};

export default Login;
