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
      const result = await axios.put(
        "http://localhost:5000/api/user/room/" + rid,
        { type: "Register for room" },
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      if (result?.data?.success) {
        toast.success(result?.data?.mes?.type);
      }
      // toast.success();
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
  // const [servicesRoom, setServicesRoom] = React.useState({});
  useEffect(() => {
    const getRoomByID = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/room/one/${_id}`
      );
      setRoomRender(result.data.data);
      // setServicesRoom({ ...result.data.roomServices });
    };
    getRoomByID();
  }, [_id]);

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
                      {/* <Typography.Paragraph>Dịch vụ:</Typography.Paragraph>
                      <ul style={{ fontWeight: "initial" }}>
                        {services.map((item) =>
                          item?.map((el) => (
                            <Typography.Paragraph key={el._id}>
                              {el?.name}
                            </Typography.Paragraph>
                          ))
                        )}
                      </ul> */}
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
