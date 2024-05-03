import React from 'react';

const PageNotFound = () => {
  return (
    <div>
      {' '}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          opacity: '0.7',
        }}
      >
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
          }}
        >
          404
        </h1>
        <h3
          style={{
            fontSize: '25px',
            fontWeight: 'bold',
          }}
        >
          Not Found
        </h3>
        <p
          style={{
            fontSize: '20px',
          }}
        >
          The requested resource could not be found in this server!
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
