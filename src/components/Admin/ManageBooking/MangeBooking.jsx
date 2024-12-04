import { Space, Table, Tag, Modal, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    fetchAllBookings,
    fetchDeleteBooking,
    fetchUpdateBooking,
} from "../../../redux/reservationSlice";
import formatDate from "../../../utils/formatDate";
import ModelDetail from "./ModelDetail";
import { useFormik } from "formik";
import * as yup from "yup";
import InputCustom from "../../Custom/InputCustom";

const MangeBooking = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [record, setRecord] = React.useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };
    useEffect(() => {
        dispatch(fetchAllBookings());
    }, []);
    const arrBooking = useSelector(
        (state) => state.reservationReducer.arrAllBooking
    );
    //  console.log(arrBooking);
    const arrNewBooking = arrBooking.map((item) => {
        const dateIn = new Date(item.checkIn);
        const formattedDateIn = formatDate.formatDateAndTime(dateIn);

        const dateOut = new Date(item.checkOut);
        const formattedDateOut = formatDate.formatDateAndTime(dateOut);

        const createdAt = new Date(item.createdAt);
        const formattedCreatedAt = formatDate.formatDateAndTime(createdAt);
        const updatedAt = new Date(item.updatedAt);
        const formattedUpdatedAt = formatDate.formatDateAndTime(updatedAt);

        return {
            ...item,
            formattedDateIn,
            formattedDateOut,
            createdAt: formattedCreatedAt,
            updatedAt: formattedUpdatedAt,
        };
    });
    // console.log(arrNewBooking);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
        },

        {
            title: "Ngày nhận phòng",
            dataIndex: "formattedDateIn",
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
                            handleDetail(record);
                        }}
                        className="bg-sky-500/85 text-white rounded-xl   py-2 px-5"
                    >
                        Xem
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                            showLoading();
                            setRecord(record);
                            console.log("first", record);
                        }}
                        className="bg-yellow-500/85 text-white rounded-xl py-2 px-5"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện onRow khi nhấn nút
                            message.success({ content: "Xóa thành công" });
                            handleDelete(record.id);
                        }}
                        className="bg-red-500/85 text-white rounded-xl py-2 px-5"
                    >
                        Xóa
                    </button>
                </Space>
            ),
        },
    ];
    const options = [
        {
            value: 0,
            label: (
                <Link
                    onClick={() => {
                        console.log("action");
                    }}
                    className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                >
                    <img
                        src="https://via.placeholder.com/300"
                        alt="placeholder"
                        className="w-12 h-12 object-cover rounded-lg"
                    />

                    <h3>Tiền mặt</h3>
                </Link>
            ),
        },
        {
            value: 1,
            label: (
                <Link
                    onClick={() => {
                        console.log("action");
                    }}
                    className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                >
                    <img
                        src="https://via.placeholder.com/300"
                        alt="placeholder"
                        className="w-12 h-12 object-cover rounded-lg"
                    />

                    <h3>CREDIT_CARD</h3>
                </Link>
            ),
        },
        {
            value: 2,
            label: (
                <Link
                    onClick={() => {
                        console.log("action");
                    }}
                    className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                >
                    <img
                        src="https://via.placeholder.com/300"
                        alt="placeholder"
                        className="w-12 h-12 object-cover rounded-lg"
                    />

                    <h3>PAYPAL</h3>
                </Link>
            ),
        },
        {
            value: 3,
            label: (
                <Link
                    onClick={() => {
                        console.log("action");
                    }}
                    className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                >
                    <img
                        src="https://via.placeholder.com/300"
                        alt="placeholder"
                        className="w-12 h-12 object-cover rounded-lg"
                    />

                    <h3>MOMO</h3>
                </Link>
            ),
        },
        {
            value: 4,
            label: (
                <Link
                    onClick={() => {
                        console.log("action");
                    }}
                    className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                >
                    <img
                        src="https://via.placeholder.com/300"
                        alt="placeholder"
                        className="w-12 h-12 object-cover rounded-lg"
                    />

                    <h3>Momo</h3>
                </Link>
            ),
        },
        {
            value: 5,
            label: (
                <Link
                    onClick={() => {
                        console.log("action");
                    }}
                    className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                >
                    <img
                        src="https://via.placeholder.com/300"
                        alt="placeholder"
                        className="w-12 h-12 object-cover rounded-lg"
                    />

                    <h3>BANK_TRANSFER</h3>
                </Link>
            ),
        },
    ];

    const formik = useFormik({
        initialValues: {
            checkIn: record.checkIn,
            checkOut: record.checkOut,
            totalPrice: record.totalPrice,
            userId: record.userId,
            roomId: record.roomId,
            guests: record.guests,
            paymentMethod: record.paymentMethod,
            paymentStatus: record.paymentStatus,
        },
        validationSchema: yup.object({
            checkIn: yup.string().required("Không được để trống"),
            checkOut: yup.string().required("Không được để trống"),
            guests: yup.number().required("Không được để trống"),
            totalPrice: yup.number().required("Không được để trống"),
            paymentMethod: yup.string().required("Không được để trống"),
            paymentStatus: yup.boolean().required("Không được để trống"),
        }),
        onSubmit: (values) => {
            console.log(values);
            // Gọi API cập nhật booking
            dispatch(fetchUpdateBooking(values));
            message.success("Cập nhật thành công");
            setOpen(false);
            formik.resetForm();
        },
    });

    const handleTotalPriceClick = (record) => {
        console.log("Total price clicked for record: ", record);
        setIsModalVisible(true);
        // Add your custom logic here
    };
    const handleDetail = (record) => {
        setRecord(record);
        console.log(record);
        setIsModalVisible(true); // Mở modal để hiển thị chi tiết
    };
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        onBlur,
        setFieldValue,
        onChange,
        handleSubmit,
    } = formik;
    const handleUpdateBooking = (bookingId, record) => {
        <Modal
            loading={loading}
            title="Cập nhật thông tin đặt phòng"
            footer={null}
            open={open}
            onCancel={() => {
                setOpen(false);
            }}
        >
            <form
                action=""
                className="mt-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submission attempted");
                    console.log(values);
                    formik.validateForm().then((errors) => {
                        //check validation before submit
                        if (Object.keys(errors).length === 0) {
                            console.log(
                                "No validation errors, submitting form"
                            );
                        } else {
                            console.log("Validation Errors:", errors); // Log validation errors to debug
                        }
                    });
                }}
            >
                <InputCustom
                    label={"Ngày nhận phòng"}
                    placehoder={"Ngày nhận phòng"}
                    name="checkIn"
                    error={errors.checkIn}
                    touched={touched.checkIn}
                    onChange={handleChange}
                    value={values.checkIn}
                    onBlur={handleBlur}
                    id={"checkIn"}
                />
                <InputCustom
                    label={"Ngày trả phòng"}
                    typeInput="date"
                    placehoder={"Ngày trả phòng"}
                    name="checkOut"
                    error={errors.checkOut}
                    touched={touched.checkOut}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.checkOut}
                    id={"checkOut"}
                />
                <div className="flex justify-between w-full gap-4">
                    <InputCustom
                        label={"ID User"}
                        placehoder={"ID User"}
                        name="userId"
                        error={errors.userId}
                        touched={touched.userId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userId}
                        id={"userId"}
                    />
                    <InputCustom
                        label={"ID Room"}
                        placehoder={"ID Room"}
                        name="roomId"
                        error={errors.roomId}
                        touched={touched.roomId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.roomId}
                        id={"roomId"}
                    />
                </div>
                <div className="flex justify-between w-full gap-4 items-center">
                    <InputCustom
                        typeInput="number"
                        label={"Tổng tiền"}
                        placehoder={"Tổng tiền"}
                        name="totalPrice"
                        error={errors.totalPrice}
                        touched={touched.totalPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.totalPrice}
                        id={"totalPrice"}
                    />
                    <InputCustom
                        label={"Số khách"}
                        typeInput="number"
                        placehoder={"Số khách"}
                        name="guests"
                        error={errors.guests}
                        touched={touched.guests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.guests}
                        id={"guests"}
                    />
                </div>
                <div className="flex justify-between w-full gap-4 items-center">
                    <div className="mr-10 py-8 min-w-80 min-h-10">
                        <Select
                            className="py-4 px-10 w-full h-full"
                            placeholder="Phương thức thanh toán"
                            value={values.paymentMethod}
                            onChange={(value) =>
                                setFieldValue("paymentMethod", value)
                            }
                            options={options}
                        />
                    </div>
                    <InputCustom
                        label={"Trạng thái"}
                        placehoder={"Trạng thái thanh toán"}
                        name="paymentStatus"
                        error={errors.paymentStatus}
                        touched={touched.paymentStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.paymentStatus}
                        id={"paymentStatus"}
                    />
                </div>

                <div className="flex justify-end p-3 gap-3">
                    <button
                        type="submit"
                        // onClick={() => setStep(step + 1)}
                        className="bg-main px-5 font-semibold text-white py-2 rounded-lg"
                    >
                        Cập nhật
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false);
                            formik.resetForm();
                        }}
                        className="text-main border border-red-500 bg-white px-5 font-semibold  py-2 rounded-lg"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </Modal>;
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
            {open && handleUpdateBooking(record.id, record)}
            <h1 className="text-center text-main text-3xl pb-8 font-semibold">
                Quản lí đặt phòng
            </h1>
            <Table columns={columns} dataSource={arrNewBooking} />
            <ModelDetail
                record={record}
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
            />
        </>
    );
};

export default MangeBooking;
