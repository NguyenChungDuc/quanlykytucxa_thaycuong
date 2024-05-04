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
import toast, { Toaster } from "react-hot-toast";

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

  const handleRegisterRoom = async (rid) => {
    try {
      const tokenAuth = localStorage.getItem("auth");
      const token = JSON.parse(tokenAuth);
      const result = await axios.post(
        "http://localhost:5000/api/user/room/" + rid,
        { name: "Register" },
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      if (result?.data?.success) {
        toast.success(result?.data?.mes);
      }
    } catch (error) {
      toast.error(error?.response?.data?.mes);
    }
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
                title={`Phòng : ${room?.numberRoom}`}
                cover={
                  <Image
                    preview={false}
                    className="roomsImage"
                    src={room?.thumb}
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
                      handleRegisterRoom(room._id);
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
                        Giá phòng : ${room?.roomPrice}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        Số lượng thành viên : {room?.currentPeople?.length}/
                        {room?.maxPeople}
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
        {item && (
          <ModalRenderRooms _id={item} onRegisterForRoom={handleRegisterRoom} />
        )}
      </Modal>
    </>
  );
};

const ModalRenderRooms = ({ _id, onRegisterForRoom }) => {
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

  return (
    <>
      {roomRender && (
        <Card
          title={`Phòng : ${roomRender.numberRoom}`}
          cover={<Image preview={false} src={roomRender.thumb} height={300} />}
          style={{ margin: 10 }}
        >
          <Card.Meta
            title={
              <>
                <Row>
                  <Col span={12}>
                    <Typography.Paragraph style={{ whiteSpace: "wrap" }}>
                      Mô tả : {roomRender.description}
                    </Typography.Paragraph>
                    <Flex vertical gap={12}>
                      <Flex gap={32} align="flex-start">
                        <Typography.Paragraph>Thiết bị:</Typography.Paragraph>
                        <ul style={{ fontWeight: "initial" }}>
                          {roomRender?.devices?.map((item, index) => (
                            <li key={`${item}-${index}`}>{item.name}</li>
                          ))}
                        </ul>
                      </Flex>
                      <Flex gap={32} align="flex-start">
                        <Typography.Paragraph>Dịch vụ:</Typography.Paragraph>
                        <ul style={{ fontWeight: "initial" }}>
                          {roomRender?.services?.map((item, index) => (
                            <li key={`${item}-${index}`}>{item.name}</li>
                          ))}
                        </ul>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={12}>
                    <Flex vertical align="flex-end">
                      <Typography.Paragraph>
                        Giá phòng : ${roomRender.roomPrice}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        Số lượng thành viên :{" "}
                        {roomRender?.currentPeople?.length}/
                        {roomRender.maxPeople}
                      </Typography.Paragraph>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRegisterForRoom(roomRender?._id);
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
