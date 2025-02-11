import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../utils/localStorage";
import { authService } from "../../service/auth.service";
import { useDispatch, useSelector } from "react-redux";
import {
    updateFromApiReservation,
    updateRoomReservation,
} from "../../redux/reservationSlice";
import { updateInfoUser, updateAvatarUser } from "../../redux/authSlice";
import { getRoomByLocationId } from "../../service/getRoomByLocationId";
import { convertCurrency } from "../../common/convertCurrency";
import SpinnerCustom from "../Custom/SpinnerCustom";
import UserInfo from "./UserInfo";
import HanldeUpdateUserInfo from "./HanldeUpdateUserInfo";
import { Button, DatePicker, message, Modal } from "antd";
import InputCustom from "../Custom/InputCustom";
import { useFormik } from "formik";
import * as yup from "yup";

import dayjs from "dayjs";
import { UserIcon2 } from "../../Icon/IconStorage";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { booking } from "../../service/booking.service";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
    //const user = getLocalStorage("user");

    const user = useSelector((state) => state.authSlice.infoUser);
    console.log(user);

    const dispatch = useDispatch();
    // Kiểm tra và cập nhật Redux từ localStorage khi user thay đổi

    const { arrReservation } = useSelector((state) => state.reservationReducer);
    const [infoBooking, setInfoBooking] = useState({});
    // const { arrRoomById } = useSelector((state) => state.reservationReducer);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    useEffect(() => {
        if (status === "success") {
            message.success("Thanh toán thành công!");
        } else if (status === "failure") {
            message.error("Thanh toán thất bại. Vui lòng thử lại.");
        }
    }, [status]);
    console.log(arrReservation);
    //  console.log(arrRoomById);
    //get Reservation by id of that user and update to redux

    useEffect(() => {
        if (user?.id && arrReservation.length === 0) {
            authService
                .getReservations(user?.id)
                .then((res) => {
                    console.log(res);
                    dispatch(updateFromApiReservation(res.data.content));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user?.id, arrReservation.length, dispatch]);
    const [avatar, setAvatar] = useState({});
    const [step, setStep] = useState(1);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setStep(step + 1);
    // };
    // const handleSubmitEnd = (e) => {
    //     e.preventDefault();
    //     setStep(1);
    //     setOpen(false);
    // };

    async function getUserIp() {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    }
    const handlePayment = async (bookingId) => {
        try {
            const response = await booking.getVnpayUrl(bookingId);
            const paymentUrl = response.data; // URL thanh toán từ backend
            console.log(paymentUrl);
            window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán VNPAY
        } catch (error) {
            console.error("Error in payment:", error);
            message.error("Có lỗi xảy ra trong quá trình thanh toán");
        }
    };

    const isValidDate = (dateString) => {
        return dayjs(dateString, "DD-MM-YYYY", true).isValid();
    };

    // console.log(infoUser);
    const handleUploadAvatar = (event) => {
        event.preventDefault();
        // Chuyển đổi dữ liệu vào formData
        let formData = new FormData();
        formData.append("file", avatar.file);
        // let { token } = infoUser;
        // console.log(token);
        nguoiDungService
            .uploadAvatar(user.id, formData)
            .then((res) => {
                console.log(res);
                dispatch(updateAvatarUser(res.data.content.user));
                setStep(1);
                setOpen(false);
                message.success("Cập nhật ảnh thành công");
            })
            .catch((err) => {
                console.log(err);
                setOpen(true);
            });
    };
    console.log(avatar);

    useEffect(() => {
        if (user) {
            console.log(user);
            setFieldValue("name", user.name);
            setFieldValue("email", user.email);
            setFieldValue("phone", user.phone);
            setFieldValue(
                "birthday",
                isValidDate(user.birthday) ? user.birthday : ""
            );
        }
    }, [user]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthday: "",
            phone: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Không được bỏ trống họ tên"),
            email: yup
                .string()
                .email("Email không hợp lệ")
                .required("Không được bỏ trống email"),
            phone: yup
                .string()

                .matches(
                    /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/,
                    "Vui lòng nhập đúng phone Việt Nam"
                )
                .required("Vui lòng nhập đúng phone Việt Nam"),
            birthday: yup.string().required("Vui lòng chọn ngày sinh"),
        }),
        onSubmit: (values) => {
            console.log(values);
            nguoiDungService
                .updateUser(user.id, values)
                .then((res) => {
                    console.log(res);
                    //update lại thông tin user
                    dispatch(updateInfoUser(res.data.content));
                    message.success("Cập nhật thông tin thành công");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });

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

    const handleUpdateStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        {/* Modal cập nhật thông tin profile */}

                        <Modal
                            title={
                                <p className="text-2xl text-center font-semibold text-main">
                                    Cập nhật thông tin profile
                                </p>
                            }
                            loading={loading}
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
                                    formik.validateForm().then((errors) => {
                                        //check validation before submit
                                        if (Object.keys(errors).length === 0) {
                                            console.log(
                                                "No validation errors, submitting form"
                                            );
                                            setStep(step + 1);
                                            handleSubmit();
                                        } else {
                                            setStep(1);
                                            console.log(
                                                "Validation Errors:",
                                                errors
                                            ); // Log validation errors to debug
                                        }
                                    });
                                }}
                            >
                                <InputCustom
                                    label={"Họ tên"}
                                    placehoder={"Họ tên cập nhật"}
                                    name="name"
                                    error={errors.name}
                                    touched={touched.name}
                                    onChange={handleChange}
                                    value={values.name}
                                    onBlur={handleBlur}
                                    id={"name"}
                                />
                                <InputCustom
                                    label={"Email"}
                                    placehoder={"Email cập nhật"}
                                    name="email"
                                    error={errors.email}
                                    touched={touched.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    id={"email"}
                                />
                                <InputCustom
                                    label={"Số điện thoại"}
                                    placehoder={"Số điện thoại cập nhật"}
                                    name="phone"
                                    error={errors.phone}
                                    touched={touched.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    id={"phone"}
                                />
                                <div className="mb-3">
                                    <label className="block mb-2 ml-1 text-sm font-medium text-gray-900">
                                        Chọn ngày sinh
                                    </label>
                                    <DatePicker
                                        name="birthday"
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5 py-2"
                                        onChange={(date, dateString) => {
                                            setFieldValue(
                                                "birthday",
                                                dateString || ""
                                            );
                                        }}
                                        format="DD/MM/YYYY"
                                        value={
                                            values.birthday
                                                ? dayjs(
                                                      values.birthday,
                                                      "DD-MM-YYYY"
                                                  )
                                                : null
                                        }
                                    />
                                    {errors.birthday || touched.birthday ? (
                                        <p className="text-red-500 mt-2">
                                            {errors.birthday}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="flex justify-end p-3 gap-3 ">
                                    <button
                                        type="submit"
                                        // onClick={() => setStep(step + 1)}
                                        className="bg-main px-5 font-semibold text-white py-2 rounded-lg"
                                    >
                                        Lưu & bước tiếp theo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="text-main border border-red-500 bg-white px-5 font-semibold  py-2 rounded-lg"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </>
                );
            case 2:
                return (
                    <>
                        <Modal
                            title={<p>Cập nhật ảnh profile</p>}
                            loading={loading}
                            footer={null}
                            open={open}
                            onCancel={() => setOpen(false)}
                        >
                            <form action="" onSubmit={handleUploadAvatar}>
                                <div className="flex flex-col items-center justify-center ">
                                    {/* Avatar */}
                                    <form onSubmit="">
                                        <div className="w-32 h-32  flex items-center justify-center">
                                            {!avatar ? (
                                                <UserIcon2
                                                    width="8em"
                                                    height="8em"
                                                />
                                            ) : (
                                                <img
                                                    className="w-32 h-32 rounded-full object-contain border-4 border-yellow-500"
                                                    src={avatar.preview}
                                                ></img>
                                            )}
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                console.log(e.target.files[0]);
                                                if (e.target.files[0]) {
                                                    setAvatar({
                                                        file: e.target.files[0],
                                                        preview:
                                                            URL.createObjectURL(
                                                                e.target
                                                                    .files[0]
                                                            ),
                                                    });
                                                }
                                            }}
                                            type="file"
                                            placeholder="Vui lòng cập nhật ảnh"
                                            className="ml-4  mt-5 "
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                    </form>
                                    {/* Xác minh danh tính */}
                                </div>
                                <div className="flex justify-end p-3 gap-3">
                                    <button
                                        type="submit"
                                        className="bg-main px-5 text-white font-semibold py-2 rounded-lg"
                                    >
                                        Lưu thay đổi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpen(false);
                                            setStep(1);
                                        }}
                                        className="text-main border border-red-500 bg-white px-5 font-semibold  py-2 rounded-lg"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </>
                );
        }
    };

    // console.log(step);
    return (
        <>
            {open && handleUpdateStep()}
            {user && (
                <div className="flex flex-col md:flex-row  gap-8 p-8 pt-0">
                    {/* Phần thông tin người dùng */}
                    <div className="w-full md:w-1/3 bg-white shadow-lg p-6 rounded-md">
                        <UserInfo info={user} />
                    </div>

                    {/* Phần chào mừng và phòng đã thuê */}
                    <div className="w-full md:w-2/3">
                        <div className="bg-white shadow-lg p-6 rounded-md mb-6">
                            <h2 className="text-xl font-bold">
                                Xin chào <span>{user.name}</span>
                            </h2>
                            <p>Bắt đầu tham gia vào 2021</p>
                            <button
                                onClick={() => {
                                    showLoading();
                                }}
                                className="text-main border font-semibold border-red-500 text-base px-5 py-1 hover:text-white hover:bg-main delay-150 rounded-lg mt-2"
                            >
                                Chỉnh sửa hồ sơ
                            </button>
                        </div>
                        {arrReservation.length === 0 ? (
                            <h3 className="font-semibold my-3 text-2xl text-main">
                                Không có phòng nào đã đặt
                            </h3>
                        ) : (
                            <h3 className="font-semibold my-3 text-2xl text-main">
                                Lịch sử đặt phòng của {user.name} đã đặt tại
                                Amazing nè
                            </h3>
                        )}

                        {/* Danh sách phòng đã thuê */}
                        <div className="grid grid-cols-1 gap-4">
                            {arrReservation?.map((item, index) => {
                                // //map 2 mảng để lấy ra thông tin phòng đã đặt là 1 object
                                // const matchingReservation = arrReservation.find(
                                //     (reserve) => reserve.maPhong === item.id
                                // );
                                // //   console.log(matchingReservation);
                                return (
                                    <div
                                        className="bg-white shadow-md rounded-md overflow-hidden  pb-8 pt-3"
                                        key={index}
                                    >
                                        <strong className="ml-4 ">
                                            {` Bạn cần phải đảm bảo thanh toán trước ngày
                                            ${new Date(
                                                item.checkIn
                                            ).toLocaleDateString("vi-VN")}
                                            nhé`}
                                        </strong>
                                        <img
                                            src={item.room.avatar}
                                            alt="Phòng 1"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="px-4 py-2 mt-2 flex justify-between items-start">
                                            <div className="w-10/12">
                                                <h3 className="font-semibold text-lg">
                                                    {item.room.name}
                                                </h3>
                                            </div>
                                            <p className="text-right font-semibold ">
                                                <span>
                                                    Tổng tiền :
                                                    {convertCurrency(
                                                        item.totalPrice
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="ml-3 mb-2 flex gap-x-2 justify-start">
                                                {item.room?.tienNghi
                                                    .split(",")
                                                    .map((item, index) => {
                                                        return (
                                                            <p
                                                                className="capitalize"
                                                                key={index}
                                                            >
                                                                {item}
                                                            </p>
                                                        );
                                                    })}
                                            </div>
                                            <div className="mr-4 mb-3">
                                                {item.paymentStatus === true ? (
                                                    <p className="text-green-700">
                                                        Đã thanh toán
                                                    </p>
                                                ) : (
                                                    <p className="text-main">
                                                        Chưa thanh toán
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="ml-3 w-8/12 flex gap-x-3 flex-start">
                                                <p className="font-semibold">
                                                    Ngày đến:{" "}
                                                    {/* {matchingReservation.ngayDen} */}
                                                    {new Date(
                                                        item.checkIn
                                                    ).toLocaleDateString(
                                                        "vi-VN"
                                                    )}
                                                </p>
                                                <p className="font-semibold">
                                                    Ngày đi:{" "}
                                                    {/* {matchingReservation.ngayDi} */}
                                                    {new Date(
                                                        item.checkOut
                                                    ).toLocaleDateString(
                                                        "vi-VN"
                                                    )}
                                                </p>
                                                <p className="font-semibold">
                                                    Số lượng khách:{" "}
                                                    {item.guests}
                                                </p>
                                            </div>
                                            <div className="w-4/12 mr-3 flex justify-end gap-5 items-center ">
                                                <button
                                                    className={`py-2 pt-3 pb-3 w-1/4 hover:bg-yellow-700 delay-200  px-1 bg-yellow-500 text-white rounded-md`}
                                                >
                                                    Hủy phòng
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handlePayment(item.id)
                                                    }
                                                    className={`py-2 pt-3  pb-3 w-1/4 hover:bg-red-800 delay-200  px-1 bg-main text-white rounded-md`}
                                                >
                                                    Thanh toán
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
