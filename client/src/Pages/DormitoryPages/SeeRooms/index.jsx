import {
  Card,
  List,
  Image,
  Button,
  Typography,
  Modal,
  Row,
  Col,
  Flex,
} from "antd";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useState, useEffect } from "react";

const SeeRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("http://localhost:5000/api/room");
      setRooms(result.data.data);
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

  const auth = localStorage.getItem("auth");

  const handleRegisterRoom = async () => {};

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
                title={`Phòng : ${
                  room.numberRoom < 10 ? `0${room.numberRoom}` : room.numberRoom
                }`}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegisterRoom();
                    }}
                  >
                    Đăng ký phòng
                  </Button>,
                ]}
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
            textAlign: "center",
            marginTop: "20px",
            border: "1px solid black",

            padding: "20px",
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

const ModalRenderRooms = ({ _id }) => {
  const [roomRender, setRoomRender] = React.useState({});
  useEffect(() => {
    const getRoomByID = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/room/one/${_id}`
      );
      setRoomRender(result.data.data);
    };
    getRoomByID();
  }, [_id]);

  console.log("roomRender >>> ", roomRender);

  return (
    <>
      {roomRender && (
        <Card
          title={`Phòng : ${
            roomRender.numberRoom < 10
              ? `0${roomRender.numberRoom}`
              : roomRender.numberRoom
          }`}
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
                <Row>
                  <Col span={12}>
                    <Typography.Paragraph>
                      Mô tả : {roomRender.description}
                    </Typography.Paragraph>
                    <Flex gap={32}>
                      <Typography.Paragraph>Thiết bị:</Typography.Paragraph>
                      <ul style={{ fontWeight: "initial" }}>
                        {roomRender?.devices?.map((item, index) => (
                          <li key={`${item}-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </Flex>
                  </Col>
                  <Col span={12}>
                    <Flex vertical align="flex-end">
                      <Typography.Paragraph>
                        Giá phòng : ${roomRender.roomprice}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        Số lượng thành viên : {roomRender.currentPeople}/
                        {roomRender.max_people}
                      </Typography.Paragraph>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Đăng ký phòng
                      </Button>
                    </Flex>
                  </Col>
                </Row>
              </>
            }
          ></Card.Meta>
        </Card>
      )}
    </>
  );
};

export default SeeRooms;
