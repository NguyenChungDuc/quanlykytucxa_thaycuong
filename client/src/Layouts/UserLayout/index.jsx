import React from 'react';
import logo from '../../Assets/logo.png';

import { Menu, Image, Button, Typography, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, Outlet } from 'react-router-dom';

const StyleParagraph = {
  fontSize: '17px',
  color: '#fff',
};
const StyleTitle = {
  color: '#fff',
  borderBottom: '1px solid gray',
};
const UserLayout = () => {
  const [openMneu, setOpenMenu] = React.useState(false);
  return (
    <>
      <div
        className="menuOutline"
        style={{
          height: '60px',
          paddingLeft: '14px',
          paddingTop: '17px',
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          style={{
            fontSize: '30px',
          }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <div className="navbar">
        <Image preview={false} src={logo} className="logo" />
        <span className="headerMenu">
          <AppMenu />
        </span>
      </div>
      <div className="navbars">
        <Drawer
          placement="left"
          onClose={() => {
            setOpenMenu(false);
          }}
          open={openMneu}
          closable={false}
          // style={{
          //   width: '200px',
          // }}
        >
          <AppMenu isInline />
        </Drawer>
      </div>{' '}
      <div className="children">
        <Outlet />
      </div>
      <div className="contact">
        <Contact />
      </div>
      <div className="footer">
        <div className="address-school">
          <Typography.Title level={3} style={StyleTitle}>
            ĐỊA CHỈ CỦA CHÚNG TÔI
          </Typography.Title>
          <Typography.Paragraph style={StyleParagraph}>
            01 Đào Duy Anh, Phường Thọ Quang, Quận Sơn Trà, TP. Đà Nẵng
          </Typography.Paragraph>
          <Typography.Paragraph style={StyleParagraph}>
            Tel : 0775.503.271
          </Typography.Paragraph>
          <Typography.Paragraph style={StyleParagraph}>
            Email : dau.edu.vn
          </Typography.Paragraph>
          <Typography.Paragraph style={StyleParagraph}>
            Giờ làm việc: Từ 7h30 - 20h00 ( Từ T2 - T6 )
          </Typography.Paragraph>
          <Typography.Paragraph style={StyleParagraph}>
            Xem bản đồ
          </Typography.Paragraph>
        </div>
        <div className="contact-school">
          <Typography.Title level={3} style={StyleTitle}>
            THEO DÕI CHÚNG TÔI
          </Typography.Title>
          <Typography.Paragraph href="/about" style={StyleParagraph}>
            <Link>DAU Tuyển sinh</Link>
          </Typography.Paragraph>
          <Typography.Paragraph href="/about" style={StyleParagraph}>
            <Link>DAU Bản tin</Link>
          </Typography.Paragraph>
          <Typography.Paragraph href="/about" style={StyleParagraph}>
            <Link>DAU Fanpage</Link>
          </Typography.Paragraph>
          <Typography.Paragraph href="/about" style={StyleParagraph}>
            <Link>DAU Tra cứu tuyển sinh</Link>
          </Typography.Paragraph>
        </div>
      </div>
    </>
  );
};
const AppMenu = ({ isInline = false }) => {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <Menu
      onClick={onMenuClick}
      mode={isInline ? 'vertical' : 'horizontal'}
      className="appHeaderMenu"
      defaultSelectedKeys={['home']}
      items={[
        {
          label: 'Trang chủ',
          key: '',
        },
        {
          label: 'Giới thiệu',
          key: 'about',
        },
        {
          label: 'Thông tin',
          key: 'info',
        },
        {
          label: 'Tin tức',
          key: 'news',
        },
        {
          label: 'Liên hệ',
          key: 'contact',
        },
        {
          label: 'Hướng dẫn',
          key: 'guide',
        },
      ]}
    />
  );
};
const Contact = () => {
  return (
    <div className="contact">
      <Button
        style={{
          background: '#f27840',
          color: '#fff',
        }}
        shape="round"
        size="large"
      >
        <Link target="blank" to="https://www.facebook.com/DaihocKientrucDanang">
          <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: '5px' }} />{' '}
          Facebook
        </Link>
      </Button>
      <Button
        style={{
          background: '#307b82',
          color: '#fff',
          display: 'block',
          width: '170px',
          marginTop: '5px',
        }}
        shape="round"
        size="large"
      >
        <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} /> 0816
        988 288
      </Button>
    </div>
  );
};

export default UserLayout;
