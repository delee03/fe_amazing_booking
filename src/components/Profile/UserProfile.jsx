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
import { Button, DatePicker, Modal } from "antd";
import InputCustom from "../Custom/InputCustom";
import { useFormik } from "formik";
import * as yup from "yup";

import dayjs from "dayjs";
import { UserIcon2 } from "../../Icon/IconStorage";
import { nguoiDungService } from "../../service/nguoiDung.service";

const UserProfile = () => {
    // const { user } = getLocalStorage("user");
    const user = useSelector((state) => state.authSlice.infoUser);

    console.log(user);

    const dispatch = useDispatch();

    // const [roomReservation, setRoomReservation] = useState([]);
    //console.log(user);
    // const [infoUser, setUserInfo] = useState({});

    // useEffect(() => {
    //     authService
    //         .getInfoUser(user?.id)
    //         .then((res) => {
    //             setUserInfo(res.data.content);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    const { arrReservation } = useSelector((state) => state.reservationReducer);
    const { arrRoomById } = useSelector((state) => state.reservationReducer);
    //console.log(arrRoomById);
    //get Reservation by id of that user and update to redux
    //console.log(arrReservation);
    useEffect(() => {
        if (user?.id && arrReservation.length === 0) {
            authService
                .getReservations(user?.id)
                .then((res) => {
                    // console.log(res);
                    dispatch(updateFromApiReservation(res.data.content));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user?.id, arrReservation.length, dispatch]);
    //get Room by id of that reservation and update to redux
    //đảm bảo là arrReservation đã có dữ liệu và arrRoomById chưa có dữ liệu mới chạy tránh gọi lại nhiều lần khi chuyển đổi url
    //redundant api calls and dispatches
    useEffect(() => {
        if (arrReservation.length > 0 && arrRoomById.length === 0) {
            const fetchRooms = async () => {
                for (let i = 0; i < arrReservation.length; i++) {
                    const roomId = arrReservation[i].maPhong;
                    try {
                        const res = await getRoomByLocationId.getRoomById(
                            roomId
                        );
                        dispatch(updateRoomReservation(res.data.content));
                    } catch (err) {
                        console.log(err);
                    }
                }
            };
            fetchRooms();
        }
    }, [arrReservation, arrRoomById.length]);

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
    const [avatar, setAvatar] = useState(null);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setStep(step + 1);
    // };
    // const handleSubmitEnd = (e) => {
    //     e.preventDefault();
    //     setStep(1);
    //     setOpen(false);
    // };

    const isValidDate = (dateString) => {
        return dayjs(dateString, "DD-MM-YYYY", true).isValid();
    };

    // console.log(infoUser);
    const handleUploadAvatar = (event) => {
        event.preventDefault();
        // Chuyển đổi dữ liệu vào formData
        let formData = new FormData();
        formData.append("formFile", avatar.file);
        // let { token } = infoUser;
        // console.log(token);
        nguoiDungService
            .uploadAvatar(formData)
            .then((res) => {
                console.log(res);
                dispatch(updateAvatarUser(res.data.content.avatar));
                setStep(1);
                setOpen(false);
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
                                    {errors.birthday && touched.birthday ? (
                                        <p className="text-red-500 mt-2">
                                            {errors.birthday}
                                        </p>
                                    ) : null}
                                </div>

                                <div className="flex justify-end p-3 gap-3">
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
                        {arrRoomById.length === 0 ? (
                            <h3 className="font-semibold my-3 text-2xl text-main">
                                Không có phòng nào đã đặt
                            </h3>
                        ) : (
                            <h3 className="font-semibold my-3 text-2xl text-main">
                                Lịch sử phòng của {user.name} đã đặt tại Airbnb
                                nè
                            </h3>
                        )}

                        {/* Danh sách phòng đã thuê */}
                        <div className="grid grid-cols-1 gap-4">
                            {arrRoomById?.map((item, index) => {
                                //map 2 mảng để lấy ra thông tin phòng đã đặt là 1 object
                                const matchingReservation = arrReservation.find(
                                    (reserve) => reserve.maPhong === item.id
                                );
                                //   console.log(matchingReservation);
                                return (
                                    <div
                                        className="bg-white shadow-md rounded-md overflow-hidden  pb-8"
                                        key={index}
                                    >
                                        <img
                                            src={item.hinhAnh}
                                            alt="Phòng 1"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="px-4 py-2 mt-2 flex justify-between items-start">
                                            <div className="w-10/12">
                                                <h3 className="font-semibold text-lg">
                                                    {item.tenPhong}
                                                </h3>
                                            </div>
                                            <p className="text-right font-semibold ">
                                                <span>
                                                    {convertCurrency(
                                                        item.giaTien,
                                                        "VND"
                                                    )}
                                                </span>
                                                / đêm
                                            </p>
                                        </div>
                                        <div className="ml-3 mb-2 flex gap-x-2 justify-start">
                                            <p>
                                                <span>{item.khach}</span> khách
                                                · Phòng studio ·{" "}
                                                <span>{item.giuong}</span>{" "}
                                                giường ·
                                                <span>{item.phongTam}</span>{" "}
                                                phòng tắm
                                            </p>
                                            <p>
                                                {item.hoBoi
                                                    ? "Đặt biệt: Hồ bơi"
                                                    : ""}{" "}
                                                -{item.wifi ? "Wifi" : ""}
                                                {item.dieuHoa
                                                    ? "Điều hòa"
                                                    : ""}{" "}
                                                -
                                                {item.mayGiat ? "Máy giặt" : ""}{" "}
                                                -{item.doXe ? "Chỗ đậu xe" : ""}
                                            </p>
                                        </div>
                                        <div>
                                            {/* Add reservation information if found */}
                                            {matchingReservation && (
                                                <div className="ml-3 flex gap-x-3 flex-start">
                                                    <p className="font-semibold">
                                                        Ngày đến:{" "}
                                                        {/* {matchingReservation.ngayDen} */}
                                                        {new Date(
                                                            matchingReservation.ngayDen
                                                        ).toLocaleDateString(
                                                            "vi-VN"
                                                        )}
                                                    </p>
                                                    <p className="font-semibold">
                                                        Ngày đi:{" "}
                                                        {/* {matchingReservation.ngayDi} */}
                                                        {new Date(
                                                            matchingReservation.ngayDi
                                                        ).toLocaleDateString(
                                                            "vi-VN"
                                                        )}
                                                    </p>
                                                    <p className="font-semibold">
                                                        Số lượng khách:{" "}
                                                        {
                                                            matchingReservation.soLuongKhach
                                                        }
                                                    </p>
                                                </div>
                                            )}
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
