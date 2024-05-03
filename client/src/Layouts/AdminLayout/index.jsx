import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faColumns,
  faSignOut,
  faTable,
  faUser,
  faUsersCog,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { Menu, Typography, Breadcrumb } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
const navigation = [
  {
    label: 'Dashboard',
    // desc: 'AAAA',
    icon: <FontAwesomeIcon icon={faColumns} />,
    key: '/admin',
  },
  {
    label: 'Manager Users',
    icon: <FontAwesomeIcon icon={faUsersCog} />,
    key: '/admin/manageruser',
  },
  {
    label: 'Manager Rooms',
    icon: <FontAwesomeIcon icon={faWarehouse} />,
    key: '/admin/managerooms',
  },
  {
    label: 'Tables',
    desc: 'BBBB',
    icon: <FontAwesomeIcon icon={faTable} />,
    // key: '/admin/test2',
  },
  {
    label: 'Profile',
    icon: <FontAwesomeIcon icon={faUser} />,
    key: '/admin/profile',
  },
  {
    label: 'Logout',
    icon: <FontAwesomeIcon icon={faSignOut} />,
    key: '/loginteacher',
  },
];
const AdminLayout = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState('');
  const handleClickMenu = ({ key }) => {
    console.log(key);
    if (key) {
      navigate(key);
      setNav(key);
      console.log('nav', nav);
      console.log('key', key);
    }
  };
  const findCurrentMenu = (key) => {
    const currentMenu = navigation.find((item) => item.key === key);
    return currentMenu?.label;
  };
  const findCurrentMenuDesc = (key) => {
    const currentMenu = navigation.find((item) => item.key === key);
    return currentMenu?.desc;
  };
  // useEffect(() => {
  //   const findCurrentMenu = (key) => {
  //     const currentMenu = navigation.find((item) => item.key === key);
  //     return currentMenu?.label;
  //   };
  //   console.log('nav', nav);
  //   console.log('findCurrentMenu', findCurrentMenu(nav));
  // }, [nav]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin Panel</title>
        </Helmet>
      </HelmetProvider>
      <div className="adminLayout-form">
        <div className="adminLayout-menu">
          <div>
            <Typography.Title className="adminLayout-menu_title">
              AdminPanel
            </Typography.Title>
            <Menu
              defaultSelectedKeys={[nav]}
              defaultOpenKeys={[nav]}
              mode="inline"
              theme="dark"
              onClick={handleClickMenu}
              items={navigation}
              style={{
                padding: '20px 10px',
              }}
            />
          </div>
        </div>
        <div className="adminLayout-content">
          <div className="adminLayout-content_header">
            <div className="adminLayout-content_breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>
                    {findCurrentMenu(nav) ? findCurrentMenu(nav) : 'Dashboard'}
                  </span>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>{findCurrentMenuDesc(nav)}</h1>
            </div>
            <div className="adminLayout-content_group">
              <input
                placeholder="Search here"
                className="adminLayout-content_search"
              />
              <FontAwesomeIcon icon={faUser} id="icon" />
              <FontAwesomeIcon icon={faCog} id="icon" />
            </div>
          </div>
          <div className="adminLayout-content_children">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
