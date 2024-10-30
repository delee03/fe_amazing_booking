import { Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { fetchAllBookings } from "../../../redux/reservationSlice";

const MangeBooking = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [record, setRecord] = React.useState({});
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
                        onClick={() => {
                            // handleOpenUpdateModal(record);
                        }}
                        className="bg-yellow-500/85 text-white py-2 px-5"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={() => {
                            message.success({ content: "Xóa thành công" });
                            // dispatch(getValueUserApi());
                        }}
                        className="bg-red-500/85 text-white py-2 px-5"
                    >
                        Xóa
                    </button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <h1 className="text-center text-main text-3xl pb-8 font-semibold">
                Quản lí đặt phòng
            </h1>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            event.preventDefault();
                            console.log(record, rowIndex);
                            setRecord(record);
                        },
                    };
                }}
                columns={columns}
                dataSource={arrNewBooking}
            />
        </>
    );
};

export default MangeBooking;
