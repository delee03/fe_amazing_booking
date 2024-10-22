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

const ManageRoom = () => {
  const dispatch = useDispatch();
  const pageSize = 9; //số phần tử trên trang
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
        const data = res.data.content;
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
        .getRoomPagination(pageIndex, pageSize)
        .then((res) => {
          // console.log(res.data.content.data);
          // console.log(total);
          setRooms(res.data.content.data); // Giả sử API trả về phần `content` là danh sách phòng
          setTotal(res.data.content.totalRow);
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
              <img
                src={item.hinhAnh}
                alt=""
                className="w-12 h-12 object-cover rounded-lg"
              />
              <h3>
                {item.tenViTri} - {item.tinhThanh}
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

                setFieldValue("maViTri", item.id);
                console.log(values.maViTri);
              }}
              className="flex items-center justify-between gap-2 h-full px-2 py-4 rounded-lg w-full"
            >
              <h3>
                {item.tenViTri} - {item.tinhThanh}
              </h3>
            </div>
          ),
        };
      });

      setOptionForm(options);
    }
  }, [dsViTri, roomUpdate]);

  const validateCreate = yup.object({
    tenPhong: yup.string().required("Không được bỏ trống họ tên"),
    khach: yup
      .number()
      .min(0, "Số lượng khách phải là số không âm")
      .notOneOf([0], "Số lượng khách phải khác 0"),
    phongNgu: yup
      .number()
      .min(0, "Số phòng ngủ phải là số không âm")
      .notOneOf([0], "Số phòng ngủ  phải khác 0"),
    giuong: yup
      .number()
      .min(0, "Số lượng giường phải là số không âm")
      .notOneOf([0], "Số lượng giường phải khác 0"),
    giaTien: yup
      .number()
      .min(0, "Giá tiền phải là số không âm")
      .notOneOf([0], "Giá tiền phải khác 0"),

    phongTam: yup
      .number()
      .min(0, "Phòng tắm phải là số không âm")
      .notOneOf([0], "Phòng tắm phải khác 0"),
    dieuHoa: yup
      .boolean("Phải là true or false nhé")
      .required("Điều hòa không được bỏ trống"),

    tivi: yup
      .boolean("Phải là true or false nhé")
      .required("Tivi không được bỏ trống"),
    hoBoi: yup
      .boolean("Phải là true or false nhé")
      .required("Hồ bơi không được bỏ trống"),
    doXe: yup
      .boolean("Phải là true or false nhé")
      .required("Đỗ xe không được bỏ trống"),
    mayGiat: yup
      .boolean("Phải là true or false nhé")
      .required("Máy giặt không được bỏ trống"),

    wifi: yup.boolean().required("Wifi không được bỏ trống"),
    moTa: yup.string().required("Không được bỏ trống mô tả"),
  });

  const validateUpdate = yup.object({
    tenPhong: yup.string().required("Không được bỏ trống họ tên"),
    khach: yup
      .number()
      .min(0, "Số lượng khách phải là số không âm")
      .notOneOf([0], "Số lượng khách phải khác 0"),
    phongNgu: yup
      .number()
      .min(0, "Số phòng ngủ phải là số không âm")
      .notOneOf([0], "Số phòng ngủ  phải khác 0"),
    giuong: yup
      .number()
      .min(0, "Số lượng giường phải là số không âm")
      .notOneOf([0], "Số lượng giường phải khác 0"),
    giaTien: yup
      .number()
      .min(0, "Giá tiền phải là số không âm")
      .notOneOf([0], "Giá tiền phải khác 0"),

    phongTam: yup
      .number()
      .min(0, "Phòng tắm phải là số không âm")
      .notOneOf([0], "Phòng tắm phải khác 0"),
    dieuHoa: yup
      .boolean("Phải là true or false nhé")
      .required("Điều hòa không được bỏ trống"),

    tivi: yup
      .boolean("Phải là true or false nhé")
      .required("Tivi không được bỏ trống"),
    hoBoi: yup
      .boolean("Phải là true or false nhé")
      .required("Hồ bơi không được bỏ trống"),
    doXe: yup
      .boolean("Phải là true or false nhé")
      .required("Đỗ xe không được bỏ trống"),
    mayGiat: yup
      .boolean("Phải là true or false nhé")
      .required("Máy giặt không được bỏ trống"),

    wifi: yup.boolean().required("Wifi không được bỏ trống"),
    moTa: yup.string().required("Không được bỏ trống mô tả"),
  });

  const formik = useFormik({
    initialValues: {
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: true,
      dieuHoa: true,
      wifi: true,
      tivi: true,
      bep: true,
      hoBoi: true,
      banLa: true,
      maViTri: "",
      doXe: true,
      hinhAnh: "",
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
            message.success("Cập nhật phòng thành công rồi nè !", 2);

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
                      console.log("No validation errors, submitting form");
                      setStep(step + 1);
                      handleSubmit();
                    } else {
                      setStep(1);
                      console.log("Validation Errors:", errors); // Log validation errors to debug
                    }
                  });
                }}
              >
                <InputCustom
                  label={"Tên phòng"}
                  placehoder={"Nhập tên phòng"}
                  name="tenPhong"
                  error={errors.tenPhong}
                  touched={touched.tenPhong}
                  onChange={handleChange}
                  value={values.tenPhong}
                  onBlur={handleBlur}
                  id={"tenPhong"}
                />
                <div className="flex justify-between w-full gap-4">
                  <InputCustom
                    label={"Số lượng khách"}
                    typeInput="number"
                    placehoder={"Số lượng khách"}
                    name="khach"
                    error={errors.khach}
                    touched={touched.khach}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.khach}
                    id={"khach"}
                  />
                  <InputCustom
                    typeInput="number"
                    label={"Số phòng ngủ"}
                    placehoder={"Số phòng ngủ"}
                    name="phongNgu"
                    error={errors.phongNgu}
                    touched={touched.phongNgu}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phongNgu}
                    id={"phongNgu"}
                  />
                  <InputCustom
                    typeInput="number"
                    label={"Số giường"}
                    placehoder={"Số giường"}
                    name="giuong"
                    error={errors.giuong}
                    touched={touched.giuong}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.giuong}
                    id={"giuong"}
                  />
                </div>
                <div className="flex justify-between w-full gap-4 items-center">
                  <InputCustom
                    typeInput="number"
                    label={"Giá 1 đêm"}
                    placehoder={"Giá 1 đêm"}
                    name="giaTien"
                    error={errors.giaTien}
                    touched={touched.giaTien}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.giaTien}
                    id={"giaTien"}
                  />
                  <InputCustom
                    label={"Phòng tắm"}
                    typeInput="number"
                    placehoder={"Số lượng phòng tắm"}
                    name="phongTam"
                    error={errors.phongTam}
                    touched={touched.phongTam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phongTam}
                    id={"phongTam"}
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
                      {errors.maViTri && touched.maViTri ? (
                        <p className="text-red-500 mt-2">{errors.maViTri}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <InputCustom
                  label={"Mô tả"}
                  placehoder={"Nhập mô tả"}
                  name="moTa"
                  error={errors.moTa}
                  touched={touched.moTa}
                  onChange={handleChange}
                  value={values.moTa}
                  onBlur={handleBlur}
                  id={"moTa"}
                />
                <div className="flex justify-between w-full gap-4">
                  <InputCustom
                    label={"Điều hòa"}
                    placehoder={"Điều hòa"}
                    name="dieuHoa"
                    error={errors.dieuHoa}
                    touched={touched.dieuHoa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dieuHoa}
                    id={"dieuHoa"}
                  />
                  <InputCustom
                    label={"Wifi"}
                    placehoder={"wifi"}
                    name="wifi"
                    error={errors.wifi}
                    touched={touched.wifi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.wifi}
                    id={"wifi"}
                  />
                  <InputCustom
                    label={"Tivi"}
                    placehoder={"Ti vi"}
                    name="tivi"
                    error={errors.tivi}
                    touched={touched.tivi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tivi}
                    id={"tivi"}
                  />
                </div>

                <div className="flex justify-between w-full gap-4">
                  <InputCustom
                    label={"Hồ bơi"}
                    placehoder={"Hồ bơi"}
                    name="hoBoi"
                    error={errors.hoBoi}
                    touched={touched.hoBoi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hoBoi}
                    id={"hoBoi"}
                  />
                  <InputCustom
                    label={"Đỗ xe"}
                    placehoder={"Đỗ xe"}
                    name="doXe"
                    error={errors.doXe}
                    touched={touched.doXe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.doXe}
                    id={"doXe"}
                  />
                  <InputCustom
                    label={"Máy giặt"}
                    placehoder={"Máy giặt"}
                    name="mayGiat"
                    error={errors.mayGiat}
                    touched={touched.mayGiat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mayGiat}
                    id={"mayGiat"}
                  />
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
                      {roomUpdate.hinhAnh ? (
                        <img
                          src={roomUpdate.hinhAnh}
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
                            preview: URL.createObjectURL(e.target.files[0]),
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
        tenPhong: roomUpdate.tenPhong,
        khach: roomUpdate.khach,
        phongNgu: roomUpdate.phongNgu,
        giuong: roomUpdate.giuong,
        phongTam: roomUpdate.phongTam,
        moTa: roomUpdate.moTa,
        giaTien: roomUpdate.giaTien,
        mayGiat: roomUpdate.mayGiat,
        dieuHoa: roomUpdate.dieuHoa,
        wifi: roomUpdate.wifi,
        tivi: roomUpdate.tivi,
        bep: roomUpdate.bep,
        hoBoi: roomUpdate.hoBoi,
        banLa: roomUpdate.banLa,
        maViTri: roomUpdate.maViTri,
        doXe: roomUpdate.doXe,
        hinhAnh: roomUpdate.hinhAnh,
      };
      formik.setValues(updateValues);
      //    {
      //     setFieldValue("tenPhong", roomUpdate.tenPhong);
      //     setFieldValue("khach", roomUpdate.khach);
      //     setFieldValue("phongNgu", roomUpdate.phongNgu);
      //     setFieldValue("phongTam", roomUpdate.phongTam);
      //     setFieldValue("giuong", roomUpdate.giuong);
      //     setFieldValue("moTa", roomUpdate.moTa);
      //     setFieldValue("giaTien", roomUpdate.giaTien);
      //     setFieldValue("tivi", roomUpdate.tivi);
      //     setFieldValue("wifi", roomUpdate.wifi);
      //     setFieldValue("doXe", roomUpdate.doXe);
      //     setFieldValue("maViTri", roomUpdate.maViTri);
      //     setFieldValue("dieuHoa", roomUpdate.dieuHoa);
      //     setFieldValue("hoBoi", roomUpdate.hoBoi);
      //     setFieldValue("mayGiat", roomUpdate.mayGiat);
      //    }
      // setFieldValue(
      //     "birthday",
      //     isValidDate(user.birthday) ? user.birthday : ""
      // );
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
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
                <Link to={`/list-room-by-location/room-detail/${item.id}`}>
                  <div className=" w-full  h-64">
                    <img
                      className="w-11/12 h-full object-cover rounded-2xl"
                      src={item.hinhAnh}
                      alt=""
                    />
                  </div>
                </Link>

                <h3 className="font-semibold mt-3 min-h-12">{item.tenPhong}</h3>
                <div className="flex justify-between my-2  mr-10 ml-1">
                  {/* <span className="text-gray-600">
                                        Số khách: {item.khach}
                                    </span>
                                    <h5 className=" text-gray-600 ">
                                        Giường đôi: {item.giuong}
                                    </h5> */}
                  <button className="px-4 py-2 bg-main text-white font-semibold rounded-xl ">
                    <Link to={`/list-room-by-location/room-detail/${item.id}`}>
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
                                    {convertCurrency(item.giaTien)}
                                    /đêm
                                </h4> */}
              </div>
            );
          })}
      </div>
      <Pagination
        className="py-10 mx-0 flex justify-center mt-8"
        current={pageIndex}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
      ;
    </section>
  );
};
export default ManageRoom;
