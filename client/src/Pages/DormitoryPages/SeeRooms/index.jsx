import { Card, List, Image, Button, Typography, Modal } from 'antd';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';

const SeeRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get('http://localhost:5000/api/room');
      setRooms(result.data.data);
      // const sortID = result.data.data.sort(
      //   (a, b) => a.numberRoom - b.numberRoom
      // );
      // setRooms(sortID);
    };
    getData();
  }, []);

  const showModal = (_id) => {
    setIsModalOpen(true);
    setItem(_id);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setItem(null);
  };

  const auth = localStorage.getItem('auth');
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Room</title>
        </Helmet>
      </HelmetProvider>
      {auth ? (
        <List
          grid={{ column: 3 }}
          renderItem={(room, index) => {
            return (
              <Card
                className="card-room"
                key={index}
                title={`Phòng : 0${room.numberRoom}`}
                cover={
                  <Image
                    preview={false}
                    className="roomsImage"
                    src={room.thumb.path}
                    height={270}
                    style={{ zIndex: -2 }}
                  />
                }
                onClick={() => {
                  showModal(room._id);
                }}
                actions={[
                  <Button
                    onClick={() => {
                      showModal(room._id);
                      console.log('room', room._id);
                    }}
                  >
                    Đăng ký phòng
                  </Button>,
                ]}
                // actions={[<RoomRegistration item={room} />]}
                style={{ margin: 10 }}
              >
                <Card.Meta
                  title={
                    <>
                      <Typography.Paragraph>
                        Giá phòng : ${room.roomprice}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        Số lượng thành viên : {room.currentPeople}/4
                      </Typography.Paragraph>
                    </>
                  }
                ></Card.Meta>
              </Card>
            );
          }}
          dataSource={rooms}
        />
      ) : (
        <h1
          style={{
            textAlign: 'center',
            marginTop: '20px',
            border: '1px solid black',

            padding: '20px',
          }}
        >
          Vui lòng đăng nhập để đăng ký phòng .
        </h1>
      )}

      <Modal
        closable={false}
        title=""
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={false}
        width={1200}
      >
        {item && <ModalRenderRooms _id={item} />}
      </Modal>
    </>
  );
};
// const RoomRegistration = () => {
//   const handleRegistration = () => {
//     console.log('register');
//   };
//   return (
//     <>
//       <Button type="primary" onClick={handleRegistration}>
//         Đăng ký phòng
//       </Button>
//     </>
//   );
// };

const ModalRenderRooms = ({ _id }) => {
  const [roomRender, setRoomRender] = React.useState({});
  useEffect(() => {
    const getRoomByID = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/room/one/${_id}`
      );
      setRoomRender(result.data.data);
      console.log('roomRender', result);
    };
    getRoomByID();
  }, [_id]);
  return (
    <>
      {roomRender && (
        <Card
          title={`Phòng : 0${roomRender.numberRoom}`}
          cover={
            <Image
              preview={false}
              src={roomRender.thumb && roomRender.thumb.path}
              height={300}
            />
          }
          style={{ margin: 10 }}
        >
          <Card.Meta
            title={
              <>
                <Typography.Paragraph>
                  Giá phòng : ${roomRender.roomprice}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Số lượng thành viên : {roomRender.currentPeople}/4
                </Typography.Paragraph>
              </>
            }
          ></Card.Meta>
        </Card>
      )}
    </>
  );
};

export default SeeRooms;
