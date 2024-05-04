import React, { useEffect, useState } from "react";
import { Card, List, Image, Button, Typography, Modal } from "antd";

import axios from "axios";
import { Tabs } from "antd";
const styleForm = {
  position: "relative",
  width: "50%",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  marginTop: "20px",
  marginBottom: "20px",
};

const styleLabel = {
  display: "block",
};
const styleInput = {
  width: "100%",
  display: "block",

  padding: "8px ",
  marginBottom: "10px",
  borderRadius: "5px",
  outline: "none",
  border: "1px solid #ccc",
};
const styleBtn = {
  width: "100%",
  padding: "8px ",
  marginBottom: "10px",
  borderRadius: "5px",
  outline: "none",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s",
};

const MangerRooms = () => {
  return (
    <>
      <Tabs defaultActiveKey="All Users" type="card">
        <Tabs.TabPane tab="Manager Rooms" key="1">
          <ManagerRooms />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Room" key="2">
          <AddRoom />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
const ManagerRooms = () => {
  const [rooms, setRooms] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(false);
  const showModal = (_id) => {
    setIsModalOpen(true);
    setItem(_id);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setItem(null);
  };

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("http://localhost:5000/api/room");
      setRooms(result.data.data);
    };
    getData();
  }, []);

  return (
    <>
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
                // showModal(room._id);
              }}
              actions={[
                <Button
                  onClick={() => {
                    showModal(room?._id);
                    console.log("room", room?._id);
                  }}
                >
                  Sửa thông tin
                </Button>,
              ]}
              // actions={[<RoomRegistration item={room} />]}
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
      console.log("roomRender", result);
    };
    getRoomByID();
  }, [_id]);
  return (
    <>
      {roomRender && (
        <Card
          title={`Phòng : ${roomRender?.numberRoom}`}
          cover={<Image preview={false} src={roomRender?.thumb} height={300} />}
          style={{ margin: 10 }}
        >
          <Card.Meta
            title={
              <>
                <Typography.Paragraph>
                  Giá phòng : ${roomRender?.roomPrice}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Số lượng thành viên : {roomRender?.currentPeople?.length}/
                  {roomRender?.maxPeople}
                </Typography.Paragraph>
              </>
            }
          ></Card.Meta>
        </Card>
      )}
    </>
  );
};
const AddRoom = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [classStudy, setClassStudy] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = async (e) => {};
  return (
    <>
      <form style={styleForm} onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="" style={styleLabel}>
              Số phòng :
            </label>
            <input
              type="text"
              autoFocus
              style={styleInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Thumbnail :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" style={styleLabel}>
              Giá phòng :
            </label>
            <input
              type="text"
              style={styleInput}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Số lượng người ở tối đa :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={classStudy}
              onChange={(e) => setClassStudy(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Phone :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" style={styleBtn}>
            Add User
          </button>
        </div>
      </form>
    </>
  );
};
export default MangerRooms;
