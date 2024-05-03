import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
const DormitoryRegistration = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Đăng ký nội trú - DAU</title>
          <meta
            name="description"
            content="Đăng ký nội trú - Đại học Đà Nẵng"
          />
          {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
        </Helmet>
      </HelmetProvider>

      <div className="dormitoryRegistration-row">
        <h1>Biểu mẫu đăng ký nội trú</h1>
      </div>
    </>
  );
};

export default DormitoryRegistration;
