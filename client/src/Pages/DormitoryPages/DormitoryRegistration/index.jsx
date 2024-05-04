import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Button, Flex, Image } from "antd";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const DormitoryRegistration = () => {
  const [contact, setContact] = useState(null);
  const [room, setRoom] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const render = useCallback(() => {
    setIsUpdate(!isUpdate);
  }, [isUpdate]);

  const fetchApiCurrent = async () => {
    try {
      const tokenAuth = localStorage.getItem("auth");
      const token = JSON.parse(tokenAuth);
      const result = await axios.get("http://localhost:5000/api/user/current", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      if (result?.data?.success) {
        render();
        setContact(result.data.contact);
        setRoom(result.data.room);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiCurrent();
  }, [isUpdate]);

  const handleCancel = async (status, contactId) => {
    if (status === "Success") {
      try {
        const tokenAuth = localStorage.getItem("auth");
        const token = JSON.parse(tokenAuth);
        const result = await axios.get(
          "http://localhost:5000/api/user/cancel/" + contactId,
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
    } else if (status === "Processing") {
      try {
        const tokenAuth = localStorage.getItem("auth");
        const token = JSON.parse(tokenAuth);
        const result = await axios.delete(
          "http://localhost:5000/api/contact/" + contactId,
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
          <title>Đăng ký nội trú - DAU</title>
          <meta
            name="description"
            content="Đăng ký nội trú - Đại học Đà Nẵng"
          />
        </Helmet>
      </HelmetProvider>

      <div className="dormitoryRegistration-row">
        <h1 style={{ marginLeft: "20px" }}>Hợp đồng đăng ký tạm trú</h1>
        <Flex vertical style={{ margin: "20px" }} gap={16}>
          {typeof room !== "string" && (
            <Flex gap={32}>
              <Image
                src={room?.thumb}
                width="400px"
                height="300px"
                style={{ borderRadius: "4px" }}
              />
              <Flex vertical>
                <strong>Số phòng: {room?.numberRoom}</strong>
                <small>Giá phòng: ${room?.roomPrice}</small>
                <ul style={{ marginLeft: "16px" }}>
                  {room?.currentPeople?.map((item, index) => (
                    <li key={`${item.id}-${index}`}>
                      <small>
                        {item.name}/{item.classStudy}
                      </small>
                    </li>
                  ))}
                </ul>
              </Flex>
              <Flex vertical>
                <strong>Thiết bị</strong>
                <ul style={{ marginLeft: "16px" }}>
                  {room?.devices?.map((item, index) => (
                    <li key={`${item.id}-${index}`}>
                      <small>{item.name}</small>
                    </li>
                  ))}
                </ul>
              </Flex>
              <Flex vertical>
                <strong>Dịch vụ</strong>
                <ul style={{ marginLeft: "16px" }}>
                  {room?.services?.map((item, index) => (
                    <li key={`${item.id}-${index}`}>
                      <small>
                        {item.name} - ${item.price}
                      </small>
                    </li>
                  ))}
                </ul>
              </Flex>
            </Flex>
          )}
          {typeof contact === "string" ? (
            <span>{contact}</span>
          ) : (
            <Flex vertical gap={4}>
              <p>
                <strong>Tên hợp đồng: </strong>
                <span>
                  {contact?.name === "Register" && "Hợp đồng đăng ký phòng"}
                </span>
              </p>
              <p>
                <strong>Ngày đăng ký: </strong>
                <span>
                  {moment(contact?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </p>
              <p>
                <strong>Ngày nhận phòng: </strong>
                <span>
                  {moment(contact?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </p>
              <p>
                <strong>Trạng thái hợp đồng: </strong>
                <span>
                  {contact?.status === "Success" && "Đã được xét duyệt"}
                  {contact?.status === "Processing" && "Đang chờ xét duyệt"}
                </span>
              </p>
              <Button
                type="primary"
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(contact?.status, contact?._id);
                }}
                style={{ width: "max-content" }}
              >
                Hủy đăng ký
              </Button>
            </Flex>
          )}
        </Flex>
      </div>
    </>
  );
};

export default DormitoryRegistration;
