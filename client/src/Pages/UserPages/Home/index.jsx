import React from 'react';
import ReactPlayer from 'react-player';
import slider2 from '../../../Assets/slider1.webp';
import slider1 from '../../../Assets/slider2.jpg';
import slider3 from '../../../Assets/slider3.jpg';
import image_activity_home from '../../../Assets/image-active-home.jpg';
import { Typography, Image, Button } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import SeeRooms from '../../DormitoryPages/SeeRooms';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },

  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Trang chủ - KTX Đại học Kiến Trúc Đà Nẵng</title>
          <meta content="Trang chủ - KTX Đại học Kiến Trúc Đà Nẵng" />
          {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
        </Helmet>
      </HelmetProvider>
      <div className="home-slider">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={4000}
          centerMode={false}
          // className="slider-carousel"
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          // renderDotsOutside
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <img
            src={slider1}
            style={{
              display: 'block',
              height: '550px',
              margin: 'auto',
              width: '100%',
            }}
          />
          <img
            src={slider2}
            style={{
              display: 'block',
              height: '550px',
              margin: 'auto',
              width: '100%',
            }}
          />
          <img
            src={slider3}
            style={{
              display: 'block',
              height: '550px',
              margin: 'auto',
              width: '100%',
            }}
          />
        </Carousel>
      </div>
      <div className="container">
        <div className="form-container">
          <div className="container-left">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=CO3W3YyY4bU&ab_channel=AnhNg%E1%BB%8DcEducationTV"
              width="640px"
              height="360px"
              playing={true}
              controls={true}
              light={true}
              style={{ border: '2px solid orange' }}
            />
          </div>
          <div className="container-right">
            <Typography.Title level={2} className="container-right_title">
              VỀ KÝ TÚC XÁ
            </Typography.Title>
            <Typography.Paragraph
              style={{
                width: '70%',
                margin: '0 auto',
                display: 'block',
                fontSize: '17px',
              }}
            >
              {' '}
              Ban Quản lý Ký túc xá – The Board of Dormitory Management được
              thành lập theo quyết định số 2893/QĐ-ĐHKT-QTNNL được ký vào ngày
              28 tháng 10 năm 2020 thuộc Đại học Kiến Trúc TP. Đà Nẵng từ bộ
              phận quản lý ký túc xá của Trung tâm Hỗ trợ sinh viên. Là đơn vị
              phục vụ, với chức năng nhiệm vụ chăm lo cho Sinh viên điều kiện
              tốt nhất trong ăn ở, học tập, sinh hoạt; ngoài ra còn chăm lo đời
              sống tinh thần của sinh viên nội trú.
            </Typography.Paragraph>
            <Button
              type="primary"
              href="/about"
              style={{ margin: '20px auto', display: 'block', width: '20%' }}
            >
              XEM CHI TIẾT
            </Button>
          </div>
        </div>
      </div>
      <div className=""></div>
      <div className="dormitory">
        <Typography.Title level={2} className="dormitory-title">
          KÝ TÚC XÁ
        </Typography.Title>
        <div className="dormitory-btn">
          <Button
            type="primary"
            size="large"
            shape="default"
            href="/dormitory/room"
            target="blank"
            style={{
              background: '#f58c5c',
              width: '200px',
            }}
          >
            ĐĂNG KÝ KÝ TÚC XÁ
          </Button>
          <Button
            type="primary"
            size="large"
            shape="default"
            href="/guide"
            style={{
              background: '#387f86',
              width: '200px',
            }}
          >
            HƯỚNG DẪN
          </Button>
        </div>
      </div>
      <div className="dormitoryActive">
        <div className="dormitoryActive-information">
          <Typography.Title level={3} type="warning">
            CÁC HOẠT ĐỘNG : PHONG TRÀO - THIỆN NGUYỆN
          </Typography.Title>
          <Typography.Paragraph className="paragraph">
            Ký túc xá Đại học Kiến Trúc Đà Nẵng luôn tạo điều kiện cho sinh viên
            tham gia các hoạt động, phong trào, thiện nguyện để phát triển bản
            thân, tạo cơ hội giao lưu, học hỏi, gắn kết với cộng đồng sinh viên
            nội trú.
          </Typography.Paragraph>
          <Typography.Title level={4} type="warning">
            CÁC HOẠT ĐỘNG THIỆN NGUYỆN
          </Typography.Title>
          <Typography.Paragraph className="paragraph">
            - Nồi cháo tình thương: Định kỳ hằng tháng Ký túc xá đều có 04 nồi
            cháo dành cho các em nhỏ, những người có hoàn cảnh khó khăn ; Khu
            Tây: phát tại Trung tâm bảo trợ Đà Sơn ; Khu Đông: Phát tại Bệnh
            viện Phụ sản Nhi
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Hiến máu nhân đạo: Hiện nay đã thành lập CLB ngân hàng máu nóng
            tại 02 khu Ký túc xá, hằng năm Ký túc xá đóng góp hàng trăm đơn vị
            máu cho Hội Chữ thập đỏ…
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Phát sữa, quyên góp quần áo cũ cho các em tại Làng Hy Vọng, trẻ em
            bị chất độc màu da cam
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Chương trình “Tết sum vầy”: Hỗ trợ vé xe cho các em ở xa có hoàn
            cảnh khó khăn
          </Typography.Paragraph>
          <Typography.Title level={4} type="warning">
            CÁC HOẠT ĐỘNG PHONG TRÀO
          </Typography.Title>
          <Typography.Paragraph className="paragraph">
            - Chương trình Ngày hội chào tân sinh viên
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Chương trình Hội thao Ký túc xá
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Chương trình Liên hoan ban nhóm nhạc
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Chương trình Tiếp sức mùa thi
          </Typography.Paragraph>
          <Typography.Paragraph className="paragraph">
            - Chương trình Giờ trái đất,…
          </Typography.Paragraph>
        </div>
        <div className="dormitoryActive-image">
          <Image width={550} src={image_activity_home} />
          <div className="dormitoryActive-image_note">
            <Typography.Paragraph
              style={{
                fontStyle: 'italic',
                opacity: '0.7',
                fontSize: '17px',
              }}
            >
              Ngoài ra chương trình còn có sự tham gia của các ca sĩ, các ban
              nhóm nhạc nổi tiếng về tham gia, góp phần giúp cho các sinh viên
              giao lưu, học hỏi gắn kết lại với nhau nhằm nâng cao đời sống tinh
              thần được tốt hơn…
            </Typography.Paragraph>
          </div>
        </div>
      </div>
      <div className="dormitorySlider">
        <Typography.Title
          level={2}
          type="warning"
          style={{ marginBottom: '20px' }}
        >
          HÌNH ẢNH TIÊU BIỂU
        </Typography.Title>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay
          // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          // style={{ margin: '20px' }}
        >
          <Image
            width={200}
            src="https://source.unsplash.com/random"
            style={{ height: '200px' }}
          />

          <Image width={200} src={slider1} style={{ height: '200px' }} />

          <Image
            width={200}
            src="https://source.unsplash.com/random"
            style={{ height: '200px' }}
          />

          <Image
            width={200}
            src="https://source.unsplash.com/random"
            style={{ height: '200px' }}
          />

          <Image
            width={200}
            src="https://source.unsplash.com/random"
            style={{ height: '200px' }}
          />

          <Image
            width={200}
            src="https://source.unsplash.com/random"
            style={{ height: '200px' }}
          />
        </Carousel>
      </div>
    </>
  );
};

export default Home;
