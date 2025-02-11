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
import { booking } from "../../../service/booking.service";

const MangeBooking = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [record, setRecord] = React.useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showLoading = () => {
        setOpen(true);
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
    // checkIn: formatDate.formatDateAndTime(new Date(record.checkIn)),
    // checkOut: formatDate.formatDateAndTime(new Date(record.checkOut)),
    const showUpdateModal = (record) => {
        setRecord(record); // Lưu thông tin booking vào state
        setLoading(true);
        formik.setValues({
            checkIn: record.checkIn,
            checkOut: record.checkOut,
            totalPrice: record.totalPrice,
            userId: record.userId,
            roomId: record.roomId,
            guests: record.guests,
            paymentMethod: record.paymentMethod,
            paymentStatus: record.paymentStatus,
        });
    };

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
                            console.log("first", record);
                            e.stopPropagation(); // Ngăn sự kiện onRow khi nhấn nút
                            showUpdateModal(record);
                            showLoading();
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
            value: "OTHER",
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
            value: "CREDIT_CARD",
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
            value: "PAYPAL",
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
            value: "MOMO",
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
            value: "VNPAY",
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

                    <h3>VNPAY</h3>
                </Link>
            ),
        },
        {
            value: "BANK_TRANSFER",
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
            checkIn: "",
            checkOut: "",
            totalPrice: 0,
            userId: "",
            roomId: "",
            guests: 0,
            paymentMethod: "",
            paymentStatus: "false",
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
            // console.log(values);
            // Gọi API cập nhật booking
            const {
                checkIn,
                checkOut,
                totalPrice,
                guests,
                paymentMethod,
                paymentStatus,
            } = values;
            // const checkInFormat = formatDate.formatDateToISO(checkIn);
            // const checkOutFormat = formatDate.formatDateToISO(checkOut);
            const valuesNew = {
                ...values,
                // checkIn: checkInFormat,
                // checkOut: checkOutFormat,
                paymentStatus: paymentStatus === "true" ? true : false,
            };
            console.log("dữ liệu đã được cập nhật", valuesNew);
            // booking
            //     .update(record.id, valuesNew)
            //     .then((res) => {
            //         console.log(res);
            //         dispatch(fetchAllBookings());
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            dispatch(fetchUpdateBooking({ id: record.id, data: valuesNew }))
                .unwrap()
                .then(() => {
                    console.log("Cập nhật thành công");
                    dispatch(fetchAllBookings());
                })
                .catch((error) => {
                    console.log("Cập nhật thất bại", error);
                });

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
                                formik.handleSubmit();
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
                        pointer="pointer-events-none"
                        error={errors.checkIn}
                        touched={touched.checkIn}
                        onChange={handleChange}
                        value={values.checkIn}
                        onBlur={handleBlur}
                        id={"checkIn"}
                    />
                    <InputCustom
                        label={"Ngày trả phòng"}
                        placehoder={"Ngày trả phòng"}
                        name="checkOut"
                        pointer="pointer-events-none"
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
                            pointer={"pointer-events-none"}
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
                            pointer={"pointer-events-none"}
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
                            label={"Tổng tiền"}
                            placehoder={"Tổng tiền"}
                            name="totalPrice"
                            error={errors.totalPrice}
                            touched={touched.totalPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.totalPrice.toLocaleString() + " VND"}
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
                    <div className="flex justify-between w-full gap-2 items-center">
                        <div className="-ml-10 py-4 min-w-40">
                            <label className="ml-10 font-semibold " htmlFor="">
                                Phương thức thanh toán
                            </label>
                            <Select
                                direction="rtl"
                                className=" px-10 py-2 w-full h-full"
                                placeholder="Phương thức thanh toán"
                                value={values.paymentMethod}
                                onChange={(value) => {
                                    console.log(value);
                                    setFieldValue("paymentMethod", value);
                                }}
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
            </Modal>

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
