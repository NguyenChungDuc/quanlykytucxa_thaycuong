import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import background from '../../../Assets/image-contact.png';
import image_sideBar from '../../../Assets/image-sidebar-contact.jpeg';
const ContactPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Liên hệ</title>
          <meta
            name="description"
            content="Trang liên hệ với ký túc xá Đại học Đà Nẵng"
          />
        </Helmet>
      </HelmetProvider>
      <div className="contactPage">
        <img src={background} alt="" id="img_background" />
        <div className="contactPage-form">
          <h1>TRANG LIÊN HỆ - ĐÓNG GÓP Ý KIẾN</h1>
          <form>
            <div className="row">
              <div>
                <label htmlFor="">Họ tên :</label>
                <input type="text" placeholder="Nguyễn Văn A" autoFocus />
                <label htmlFor="">Email :</label>
                <input type="email" placeholder="kytucxadanang@dau.edu.vn" />
              </div>
              <div>
                <label htmlFor="">Số điện thoại :</label>
                <input type="text" placeholder="0775.503.271" />
                <label htmlFor="">Mã số sinh viên:</label>
                <input type="text" placeholder="2051220048" />
              </div>
              <div>
                <label htmlFor="">Nội dung</label>
                <textarea
                  cols="30"
                  rows="5"
                  placeholder="Xin mời nhập ý kiến của bạn..."
                ></textarea>
                <button type="submit">Gửi ý kiến</button>
              </div>
            </div>
          </form>
        </div>
        <div className="contactPage-body">
          <div className="contactPage-body_hotline">
            <h2>Hotline ...</h2>
            <p>0775.503.271</p>
          </div>{' '}
          <div className="contactPage-body_map">
            <div id="sideBar">
              <img
                src={image_sideBar}
                alt=""
                width="350"
                height="150"
                id="image_sideBar"
                style={{
                  marginBottom: '20px',
                  borderRadius: '10px',
                }}
              />
              <div>
                <p>
                  <strong>Địa chỉ :</strong> <br /> 01 Đào Duy Anh, Phường Thọ
                  Quang, Quận Sơn Trà, TP. Đà Nẵng
                </p>
                <p>
                  <strong>Điện thoại :</strong> 0775.503.271
                </p>
                <p>
                  <strong>Email :</strong> dau.edu.vn
                </p>
                <p>
                  <strong>Giờ làm việc :</strong> Từ 7h30 - 20h00 ( Từ T2 - T6 )
                </p>
                <p>
                  <strong>Lãnh đạo KTX :</strong>
                </p>
                <p>
                  Phòng Quản lý Ký túc xá sinh viên:(0236) 3.772. 579 / 955.579
                  <br />
                  (0236) 3.562. 592{' '}
                </p>
                <p>
                  Quản lý điều hành:
                  <br />
                  Ông Nguyễn Tất Phú Cường
                  <br /> 0962750965
                </p>
                <p>
                  <a
                    href="https://maps.app.goo.gl/CXx6Yr7RxXV4QoDq6"
                    target="blank"
                  >
                    Xem bản đồ
                  </a>
                </p>
              </div>
            </div>
            <div id="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.641009833168!2d108.21948517484309!3d16.032192640428924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ee598df9c5%3A0xaadb53409be7c909!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1712012206102!5m2!1svi!2s"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                // sandbox="allow-modals"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
