import React, { useState, useEffect } from "react";
import { message, Pagination, Select } from "antd";
import { roomPagination } from "../../../service/roomPagination.service";
import { convertCurrency } from "../../../common/convertCurrency";
import { Link } from "react-router-dom";
import { setdsViTri } from "../../../redux/viTriSlice";
import { Modal } from "antd";
import { layViTri } from "../../../service/getLocationSearch";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchRoomById,
    fetchCreateRoom,
    fetchUploadImageRoom,
    fetchUpdateRoom,
    fetchRoomPagination,
} from "../../../redux/roomDetailSlice";
import { getRoomByLocationId } from "../../../service/getRoomByLocationId";

import InputCustom from "../../Custom/InputCustom";
import { useFormik } from "formik";
import * as yup from "yup";
import { IconLocation } from "../../../Icon/IconStorage";

const ManageRoom = () => {
    const dispatch = useDispatch();
    const pageTake = 6; //số phần tử trên trang
    const [pageIndex, setPageIndex] = useState(1); //trang hiện tại

    const [total, setTotal] = useState(0); // Tổng số phần tử
    const [room, setRooms] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [updateOptions, setUpdateOptions] = useState([]);
    const [optionForm, setOptionForm] = useState([]);
    const [locationId, setLocationId] = useState("");
    const [roomImage, setRoomImage] = useState(null);
    const [step, setStep] = useState(1);
    const [idRoomCreate, setIdRoomCreate] = useState("");
    const [typeButton, setTypeButton] = useState("");
    const [roomUpdate, setRoomUpdate] = useState({});

    console.log(room);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };
    useEffect(() => {
        layViTri
            .getListLocation()
            .then((res) => {
                const data = res.data;
                // console.log(data);
                dispatch(setdsViTri(data));
            })
            .catch((err) => {
                console.log("Lỗi khi gọi api lấy vị trí", err);
            });
    }, []);
    const dsViTri = useSelector((state) => state.viTriReducer.dsViTri);
    // console.log(dsViTri);

    //mảng vị trí trong dsViTri vậy cần map thành phần tử với thuộc tính value và key của Select

    const fetchRoomPagination = () => {
        if (!locationId) {
            roomPagination
                .getRoomPagination(pageIndex, pageTake)
                .then((res) => {
                    // console.log(res.data.content.data);
                    // console.log(total);
                    setRooms(res.data.content); // Giả sử API trả về phần `content` là danh sách phòng
                    setTotal(res.data.totalCount); // Giả sử API trả về phần `total` là tổng số phần tử
                })
                .catch((err) => {
                    console.log(err);
                });
            //  dispatch(fetchRoomPagination(pageIndex, pageSize));
        } else {
            getRoomByLocationId
                .getAllRoom(locationId)
                .then((res) => {
                    const data = res.data.content;
                    setRooms(data);

                    //console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    useEffect(() => {
        fetchRoomPagination();
    }, [pageIndex, locationId, total]);
    const handlePageChange = (page) => {
        setPageIndex(page); // Chỉ cập nhật pageIndex
    };

    useEffect(() => {
        if (dsViTri && dsViTri.length > 0) {
            const options = [...dsViTri].map((item, index) => {
                return {
                    value: item.id,
                    label: (
                        <Link
                            onClick={() => {
                                console.log(item.id);

                                setLocationId(item.id);
                            }}
                            className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                        >
                            <div className="w-12 h-6 object-cover rounded-lg">
                                <IconLocation />
                            </div>
                            <h3>
                                {item.city} - {item.country}
                            </h3>
                        </Link>
                    ),
                };
            });

            setUpdateOptions(options);
        }
    }, [dsViTri]);

    // Chức năng thêm phòng

    // const phongCreate = useSelector(
    //     (state) => state.roomDetailReducer.roomCreate
    // );
    // console.log(phongCreate);
    useEffect(() => {
        if (dsViTri && dsViTri.length > 0) {
            const options = [...dsViTri].map((item, index) => {
                return {
                    value: item.id,
                    label: (
                        <div
                            onClick={() => {
                                console.log(item.id);

                                setFieldValue("locationId", item.id);
                                console.log(values.locationId);
                            }}
                            className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                        >
                            <h3>
                                {item.city} - {item.country}
                            </h3>
                        </div>
                    ),
                };
            });

            setOptionForm(options);
        }
    }, [dsViTri, roomUpdate]);

    const validateCreate = yup.object({
        name: yup.string().required("Không được bỏ trống họ tên"),
        soKhach: yup
            .number()
            .min(0, "Số lượng khách phải là số không âm")
            .notOneOf([0], "Số lượng khách phải khác 0"),
        soLuong: yup
            .number()
            .min(0, "Số phòng ngủ phải là số không âm")
            .notOneOf([0], "Số phòng ngủ  phải khác 0"),

        price: yup
            .number()
            .min(0, "Giá tiền phải là số không âm")
            .notOneOf([0], "Giá tiền phải khác 0"),

        tienNghi: yup.string().required("Không được bỏ trống tiện ích phòng"),

        description: yup.string().required("Không được bỏ trống mô tả"),
    });

    const validateUpdate = yup.object({
        name: yup.string().required("Không được bỏ trống họ tên"),
        soKhach: yup
            .number()
            .min(0, "Số lượng khách phải là số không âm")
            .notOneOf([0], "Số lượng khách phải khác 0"),
        soLuong: yup
            .number()
            .min(0, "Số phòng ngủ phải là số không âm")
            .notOneOf([0], "Số phòng ngủ  phải khác 0"),

        price: yup
            .number()
            .min(0, "Giá tiền phải là số không âm")
            .notOneOf([0], "Giá tiền phải khác 0"),

        tienNghi: yup.string().required("Không được bỏ trống tiện ích phòng"),

        description: yup.string().required("Không được bỏ trống mô tả"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            soKhach: 0,
            soLuong: 0,
            tienNghi: 0,
            description: "",
            price: 0,
            locationId: "",
            avatar: "",
        },
        validationSchema: typeButton == "add" ? validateCreate : validateUpdate,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values);
            if (typeButton === "add") {
                dispatch(fetchCreateRoom(values))
                    .unwrap() // Sử dụng unwrap để dễ dàng bắt lỗi từ AsyncThunk
                    .then((res) => {
                        console.log("Room created successfully:", res);
                        message.success("Thêm phòng thành công rồi nè !", 2);
                        setIdRoomCreate(res.id);

                        // Bạn có thể thêm code cập nhật state, chuyển trang, hoặc hành động khác ở đây.
                    })
                    .catch((error) => {
                        console.error("Error creating room:", error);
                        message.error("Đã có lỗi xảy ra hãy báo IT !", 2);
                    });
            }
            if (typeButton === "update") {
                dispatch(fetchUpdateRoom({ id: roomUpdate.id, data: values }))
                    .unwrap() // Sử dụng unwrap để dễ dàng bắt lỗi từ AsyncThunk
                    .then((res) => {
                        console.log("Room update successfully:", res);
                        message.success(
                            "Cập nhật phòng thành công rồi nè !",
                            2
                        );

                        // Bạn có thể thêm code cập nhật state, chuyển trang, hoặc hành động khác ở đây.
                    })
                    .catch((error) => {
                        console.error("Error updating room:", error);
                        message.error("Đã có lỗi xảy ra hãy báo IT !", 2);
                    });
            }
        },
    });

    const handleUploadRoomImage = (event) => {
        event.preventDefault();
        // Chuyển đổi dữ liệu vào formData
        let formData = new FormData();
        formData.append("formFile", roomImage.file);
        // Gọi API upload ảnh
        dispatch(
            fetchUploadImageRoom({
                id: typeButton === "add" ? idRoomCreate : roomUpdate.id,
                data: formData,
            })
        )
            .unwrap()
            .then((res) => {
                console.log(res);
                message.success("Thêm ảnh thành công rồi nè !", 2);
                fetchRoomPagination();
                // setRoomImage(res.data.content);
                setStep(1);
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
                setOpen(true);
                message.error("Đã có lỗi rồi admin ơi hãy báo IT nhé !", 2);
            });
    };
    // console.log(roomImage);
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
                                    {typeButton === "add"
                                        ? "Thêm thông tin cho phòng mới"
                                        : "Cập nhật thông tin phòng"}
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
                                    console.log(values);
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
                                    label={"Tên phòng"}
                                    placehoder={"Nhập tên phòng"}
                                    name="name"
                                    error={errors.name}
                                    touched={touched.name}
                                    onChange={handleChange}
                                    value={values.name}
                                    onBlur={handleBlur}
                                    id={"name"}
                                />
                                <div className="flex justify-between w-full gap-4">
                                    <InputCustom
                                        label={"Số lượng khách"}
                                        typeInput="number"
                                        placehoder={"Số lượng khách"}
                                        name="soKhach"
                                        error={errors.soKhach}
                                        touched={touched.soKhach}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.soKhach}
                                        id={"soKhach"}
                                    />
                                    <InputCustom
                                        typeInput="number"
                                        label={"Số phòng ngủ"}
                                        placehoder={"Số phòng ngủ"}
                                        name="soLuong"
                                        error={errors.soLuong}
                                        touched={touched.soLuong}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.soLuong}
                                        id={"soLuong"}
                                    />
                                </div>
                                <div className="flex justify-between w-full gap-4 items-center">
                                    <InputCustom
                                        typeInput="number"
                                        label={"Giá 1 đêm"}
                                        placehoder={"Giá 1 đêm"}
                                        name="price"
                                        error={errors.price}
                                        touched={touched.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        id={"price"}
                                    />
                                    <InputCustom
                                        label={"Phòng tắm"}
                                        typeInput="number"
                                        placehoder={"Số lượng phòng tắm"}
                                        name="tienNghi"
                                        error={errors.tienNghi}
                                        touched={touched.tienNghi}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.tienNghi}
                                        id={"tienNghi"}
                                    />

                                    <div className="mb-2">
                                        <label className="block mb-2 ml-1 text-sm font-medium text-gray-900">
                                            Chọn vị trí
                                        </label>
                                        <div className="w-full h-full">
                                            <Select
                                                showSearch={false}
                                                className=" w-full min-h-9"
                                                placeholder="Chọn phòng theo vị trí"
                                                options={optionForm}
                                            />
                                            {errors.locationId &&
                                            touched.locationId ? (
                                                <p className="text-red-500 mt-2">
                                                    {errors.locationId}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <InputCustom
                                    label={"Mô tả"}
                                    placehoder={"Nhập mô tả"}
                                    name="description"
                                    error={errors.description}
                                    touched={touched.description}
                                    onChange={handleChange}
                                    value={values.description}
                                    onBlur={handleBlur}
                                    id={"description"}
                                />

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
                    </>
                );
            case 2:
                return (
                    <>
                        <Modal
                            title={<p>Upload ảnh phòng</p>}
                            loading={loading}
                            footer={null}
                            open={open}
                            onCancel={() => setOpen(false)}
                        >
                            <form onSubmit={handleUploadRoomImage}>
                                <div className="flex flex-col items-center justify-center ">
                                    {/* Avatar */}
                                    <form onSubmit="">
                                        <div className="w-80 h-32 py-10 my-10  flex items-center justify-center">
                                            {roomUpdate.avatar ? (
                                                <img
                                                    src={roomUpdate.avatar}
                                                    alt="placeholder"
                                                    className="w-80 h-52 object-contain "
                                                />
                                            ) : !roomImage ? (
                                                <img
                                                    src="https://via.placeholder.com/300"
                                                    alt="placeholder"
                                                    className="w-80 h-52 object-contain "
                                                />
                                            ) : (
                                                <img
                                                    className="w-80 h-52 object-contain "
                                                    src={roomImage.preview}
                                                ></img>
                                            )}
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                console.log(e.target.files[0]);
                                                if (e.target.files[0]) {
                                                    setRoomImage({
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

    //end thêm phòng
    // Xóa phòng
    const handleDeleteRoom = (id) => {
        getRoomByLocationId
            .deleteRoom(id)
            .then((res) => {
                const updatedRooms = room.filter((item) => item.id !== id);
                setRooms(updatedRooms);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    ///chức năng update phòng
    console.log(typeButton);
    // let valueUpdate = useSelector(
    //     (state) => state.roomDetailReducer.roomUpdate
    // );
    useEffect(() => {
        if (typeButton == "update" && roomUpdate) {
            //console.log(roomUpdate);
            const updateValues = {
                name: roomUpdate.name,
                soKhach: roomUpdate.soKhach,
                soLuong: roomUpdate.soLuong,
                tienNghi: roomUpdate.tienNghi,
                description: roomUpdate.description,
                price: roomUpdate.price,
                hinhAnh: roomUpdate.avatar,
            };
            formik.setValues(updateValues);
        }
    }, [roomUpdate]);

    return (
        <section>
            {open && handleUpdateStep()}
            <h2 className="text-center text-main  font-semibold text-4xl">
                Quản lí thông tin phòng
            </h2>
            <div className="flex py-5 justify-between items-center">
                <button
                    className="bg-main font-semibold mb-4 px-5 py-2 rounded-lg hover:bg-white border hover:border-red-500 hover:text-main text-white"
                    onClick={() => {
                        setTypeButton("add");
                        showLoading();
                    }}
                >
                    Thêm phòng
                </button>

                <div className="mr-10 py-8 min-w-80 min-h-10">
                    <Select
                        showSearch={false}
                        className="py-4 px-10 w-full h-full"
                        placeholder="Chọn phòng theo vị trí"
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            ...updateOptions,
                            {
                                value: 0,
                                label: (
                                    <Link
                                        onClick={() => {
                                            setLocationId(null);
                                        }}
                                        className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
                                    >
                                        <img
                                            src="https://via.placeholder.com/300"
                                            alt="placeholder"
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />

                                        <h3>Tất cả địa điểm</h3>
                                    </Link>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-14  ">
                {room.length > 0 &&
                    room.map((item, index) => {
                        return (
                            <div className="max-h-64 mb-24 w-full" key={index}>
                                <Link
                                    to={`/list-room-by-location/room-detail/${item.id}`}
                                >
                                    <div className=" w-full  h-64">
                                        <img
                                            className="w-11/12 h-full object-cover rounded-2xl"
                                            src={item.avatar}
                                            alt=""
                                        />
                                    </div>
                                </Link>

                                <h3 className="font-semibold mt-3 min-h-12">
                                    {item.name}
                                </h3>
                                <div className="flex justify-between my-2  mr-10 ml-1">
                                    {/* <span className="text-gray-600">
                                        Số khách: {item.soKhach}
                                    </span>
                                    <h5 className=" text-gray-600 ">
                                        Giường đôi: {item.giuong}
                                    </h5> */}
                                    <button className="px-4 py-2 bg-main text-white font-semibold rounded-xl ">
                                        <Link
                                            to={`/list-room-by-location/room-detail/${item.id}`}
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </button>
                                    <button
                                        onClick={() => {
                                            showLoading();
                                            // console.log(item.id);
                                            console.log(item);
                                            setRoomUpdate(item);
                                            setTypeButton("update");
                                            // dispatch(
                                            //     fetchUpdateRoom(item.id, item)
                                            // );
                                        }}
                                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-xl"
                                    >
                                        Sửa thông tin
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeleteRoom(item.id);
                                            console.log(item.id);
                                        }}
                                        className="px-4 py-2 bg-sky-950 text-white font-semibold rounded-xl"
                                    >
                                        Xóa phòng
                                    </button>
                                </div>

                                {/* <h4 className="font-semibold">
                                    {convertCurrency(item.price)}
                                    /đêm
                                </h4> */}
                            </div>
                        );
                    })}
            </div>
            <Pagination
                className="py-10 mx-0 flex justify-center mt-8"
                current={pageIndex}
                pageSize={pageTake}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
            />
            ;
        </section>
    );
};
export default ManageRoom;
