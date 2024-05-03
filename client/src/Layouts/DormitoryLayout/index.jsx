import React, { useState, useEffect } from 'react';
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileSearchOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEdit,
  faEnvelope,
  faDollarSign,
  faSignOutAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Menu, Breadcrumb, Modal, Avatar } from 'antd';
import { useNavigate, Outlet, Link } from 'react-router-dom';
const navigation = [
  {
    label: 'Xem phòng',
    key: '/dormitory/room',
    desc: 'Xem thông tin phòng',
    icon: <FileSearchOutlined />,
  },
  {
    label: 'Biểu mẫu đăng ký',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    key: 'sub1',
    children: [
      {
        label: 'Đăng ký nội trú KTX',
        key: '/dormitory/registration',
        desc: 'Đơn đăng ký dành cho sinh viên',
        icon: <FontAwesomeIcon icon={faEdit} />,
      },
      {
        label: 'Thanh toán tiền phòng',
        key: '/dormitory/test',
        desc: 'Thanh toán tiền phòng cho sinh viên',
        icon: <FontAwesomeIcon icon={faDollarSign} />,
      },
      {
        label: 'Thanh toán tiền điện',
        key: '7',
        desc: 'Thanh toán theo từng phòng',
      },
      {
        label: 'Thanh toán tiền nước',
        key: '8',
        desc: 'Thanh toán theo từng phòng',
      },
      {
        label: 'Thanh toán tiền cọc nội trú',
        key: '9',
        desc: 'Thanh toán tiền cọc nội trú cho sinh viên',
      },
    ],
  },

  {
    label: 'Hướng dẫn',
    desc: 'Hướng dẫn sử dụng',
    icon: <AppstoreOutlined />,
    key: '/dormitory/instruct',
  },
];

const DormitoryLayout = () => {
  const navigate = useNavigate();
  const [curNav, setCurNav] = useState('');
  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
      setCurNav(key);
    }
  };
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (screenWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screenWidth]);
  // const findParent = (menu, key) => {
  //   for (const item of menu) {
  //     if (item.children && item.children.some((child) => child.key === key)) {
  //       return item;
  //     }
  //   }
  //   return null;
  // };
  const findParent = (menu, key) => {
    for (const item of menu) {
      if (item.children && item.children.some((child) => child.key === key)) {
        return item;
      }
    }
    return menu.find((item) => item?.key === key);
  };

  const findCurrent = (menu, key) => {
    for (const item of menu) {
      if (item.children && item.children.some((child) => child.key === key)) {
        return item.children.find((child) => child.key === key);
      }
    }
    return menu.find((item) => item?.key === key);
  };

  const RenderHeader = () => {
    const currentNav = findCurrent(navigation, curNav);
    const currenParent = findParent(navigation, curNav);

    return (
      <div className="dormitoryRegistration-nav">
        <div className="dormitoryRegistration-title">
          <div className="dormitoryRegistration-title_left">
            <h1>
              {currentNav?.icon} {currentNav?.label}{' '}
            </h1>
            <p>{currentNav?.desc}</p>
          </div>
          <div className="dormitoryRegistration-title_right">
            <Breadcrumb>
              <Breadcrumb.Item>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>{currenParent?.label}</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{currentNav?.label}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = localStorage.getItem('auth');
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };
  return (
    <>
      {/* {isModalOpen ? (
        <div className="dormitoryLayout-modal" >
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="dormitoryLayout-modal_avatar"
          />
          <div className="dormitoryLayout-modal_logout">
            Logout{' '}
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ marginLeft: '6px' }}
            />
          </div>
        </div>
      ) : null} */}
      {auth ? (
        <Modal
          closable={false}
          open={isModalOpen}
          onCancel={handleCancelModal}
          footer={null}
          className="dormitoryLayout-modal"
          width={300}
          height={150}
        >
          <Avatar
            size={40}
            icon={JSON.parse(auth).response.avatar?.path}
            className="dormitoryLayout-modal_avatar"
          />
          <div className="dormitoryLayout-modal_user">
            <p style={{ fontWeight: '500', fontSize: '18px' }}>
              Chào {JSON.parse(auth).response.name}{' '}
            </p>
            <p
              style={{
                border: '1px solid #3D3B40 ',
                padding: '2px 4px',
                margin: '7px 0',
                borderRadius: '10px',
                color: '#5BBCFF',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Quản lý tài khoản của bạn
            </p>
          </div>
          <div className="dormitoryLayout-modal_logout" onClick={handleLogout}>
            Logout{' '}
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{ marginLeft: '6px' }}
            />
          </div>
        </Modal>
      ) : (
        <Modal
          closable={false}
          open={isModalOpen}
          onCancel={handleCancelModal}
          footer={null}
          className="dormitoryLayout-modal"
          width={210}
          height={150}
        >
          <p style={{ textAlign: 'center', fontSize: '15px' }}>
            <FontAwesomeIcon
              icon={faSignInAlt}
              style={{ marginRight: '7px' }}
            />
            {''}
            Đăng nhập{' '}
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'blue',
              }}
            >
              <Link to="/loginStudent">tại đây</Link>
            </span>
          </p>
        </Modal>
      )}

      <div className="dormitoryLayout-header">
        <div>
          <h1>DAU</h1>{' '}
          <Button
            type="primary"
            onClick={toggleCollapsed}
            id="dormitoryLayout-btn"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div className="dormitoryLayout-header_profile">
          <FontAwesomeIcon icon={faUser} onClick={showModal} id="iconUser" />
        </div>
      </div>
      <div className="dormitoryLayout-content">
        <div>
          {auth ? (
            <Menu
              defaultSelectedKeys={['/dormitory/room']}
              defaultOpenKeys={['/dormitory/room']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              onClick={handleMenuClick}
              items={navigation}
              style={{
                height: '98vh',
                position: 'fixed',
                width: '17%',
                marginTop: '55px',
              }}
            />
          ) : (
            <Menu
              defaultSelectedKeys={['/dormitory/room']}
              defaultOpenKeys={['/dormitory/room']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              onClick={handleMenuClick}
              items={navigation}
              style={{
                height: '98vh',
                position: 'fixed',
                width: '17%',
                marginTop: '49px',
              }}
              disabled
            />
          )}
        </div>
        <div className="dormitoryLayout-children">
          <RenderHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DormitoryLayout;
