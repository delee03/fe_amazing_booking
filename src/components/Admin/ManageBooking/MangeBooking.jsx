import { Space, Table, Tag, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    fetchAllBookings,
    fetchDeleteBooking,
} from "../../../redux/reservationSlice";

const MangeBooking = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [record, setRecord] = React.useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        dispatch(fetchAllBookings());
    }, []);
    const arrBooking = useSelector(
        (state) => state.reservationReducer.arrAllBooking
    );
    const arrNewBooking = arrBooking.map((item) => {
        const dateIn = new Date(item.checkIn);
        const formattedDate = `${dateIn.getHours()}:${dateIn.getMinutes()} ${dateIn.getDate()}/${
            dateIn.getMonth() + 1
        }/${dateIn.getFullYear()}`;
        const dateOut = new Date(item.checkOut);
        const formattedDateOut = `${dateOut.getHours()}:${dateOut.getMinutes()} ${dateOut.getDate()}/${
            dateOut.getMonth() + 1
        }/${dateOut.getFullYear()}`;
        return {
            ...item,
            formattedDate,
            formattedDateOut,
        };
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
        },

        {
            title: "Ngày nhận phòng",
            dataIndex: "formattedDate",
            key: "checkIn",
        },

        {
            title: "Ngày trả phòng",
            dataIndex: "formattedDateOut",
            key: "checkOut",
        },
        {
            title: "Số khách",
            dataIndex: "guests",
            key: "guests",
        },

        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (text, record, index) => (
                <span
                    onClick={() => handleTotalPriceClick(record)}
                    style={{ cursor: "pointer", color: "blue" }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Phương thức",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Trạng thái",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (text, record, index) => (
                <Tag color={text ? "cyan" : "red"}>
                    {text ? "Đã thanh toán" : "Chưa thanh toán"}
                </Tag>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            key: "updateAt",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle" className="space-x-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện onRow khi nhấn nút
                            // handleOpenUpdateModal(record);
                            handleEdit(record);
                        }}
                        className="bg-yellow-500/85 text-white py-2 px-5"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện onRow khi nhấn nút
                            message.success({ content: "Xóa thành công" });
                            handleDelete(record.id);
                        }}
                        className="bg-red-500/85 text-white py-2 px-5"
                    >
                        Xóa
                    </button>
                </Space>
            ),
        },
    ];

    const handleTotalPriceClick = (record) => {
        console.log("Total price clicked for record: ", record);
        setIsModalVisible(true);
        // Add your custom logic here
    };
    const handleEdit = (record) => {
        setRecord(record);
        console.log(record);
        setIsModalVisible(true); // Mở modal để hiển thị chi tiết
    };

    const handleDelete = async (id) => {
        try {
            dispatch(fetchDeleteBooking(id));
            // Gọi API xóa booking
            message.success("Xóa thành công booking với id " + id);
            dispatch(fetchAllBookings()); // Cập nhật lại danh sách booking sau khi xóa
        } catch (error) {
            message.error("Xóa thất bại");
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <h1 className="text-center text-main text-3xl pb-8 font-semibold">
                Quản lí đặt phòng
            </h1>
            <Table
                columns={columns}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                })}
                dataSource={arrNewBooking}
            />

            <Modal
                title="Chi tiết đặt phòng"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {record && (
                    <>
                        <div className="py-3 px-4">
                            <h3 className="text-main px-3 mb-4 font-semibold text-2xl  text-center ">
                                Thông tin đặt phòng chi tiết
                            </h3>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>ID USER:</strong>
                                <p>{record.userId}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Phòng:</strong>
                                <p className="font-semibold">
                                    {record.room?.name}
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Mô tả phòng:</strong>{" "}
                                <p>{record.room?.description}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Tổng tiền:</strong>
                                <p className="text-blue-700">
                                    {record.totalPrice}
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Ngày nhận phòng:</strong>{" "}
                                <p> {record.formattedDate}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Ngày trả phòng:</strong>{" "}
                                <p>{record.formattedDateOut}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Người đặt phòng:</strong>{" "}
                                <p>{record.user?.name}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Thông tin liên hệ:</strong>{" "}
                                <p>{record.user?.phone}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Email:</strong>{" "}
                                <p>{record.user?.email}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Trạng thái thanh toán:</strong>{" "}
                                <p
                                    className={`${
                                        record.paymentStatus
                                            ? "text-green-500 font-semibold"
                                            : "text-red-600 font-semibold"
                                    }`}
                                >
                                    {record.paymentStatus
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default MangeBooking;
