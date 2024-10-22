import React, { useEffect, useState } from "react";
import { DatePicker, Space, message } from "antd";
const { RangePicker } = DatePicker;
import { getLocalStorage } from "../../utils/localStorage";
import dayjs from "dayjs";
import { convertCurrency } from "../../common/convertCurrency";
import { booking } from "../../service/booking.service";
import { useNavigate } from "react-router-dom";
import SpinnerCustom from "../Custom/SpinnerCustom";
import styles from "./Booking.module.scss";

const BookingRoom = ({ giaTien, paramsId, soLuongKhach }) => {
    // const onChange = (date, dateString) => {
    //     console.log(date, dateString);
    // };
    const navigate = useNavigate();

    const user = getLocalStorage("user");

    // console.log(user);
    const [checkInDate, setCheckInDate] = React.useState(null);
    const [checkOutDate, setCheckOutDate] = React.useState(null);
    const [soKhachChon, setSoKhachChon] = useState(1);
    const [loading, setLoading] = useState(false);
    const [soNgay, setSoNgay] = useState(0);

    const handleDateChange = (dates, dateStrings) => {
        if (dates) {
            setCheckInDate(dateStrings[0]);
            setCheckOutDate(dateStrings[1]);

            console.log("Check-in Date: ", dateStrings[0]);
            console.log("Check-out Date: ", dateStrings[1]);
            console.log(dateStrings);
        } else {
            setCheckInDate(null);
            setCheckOutDate(null);
        }
    };
    // console.log(checkInDate, checkOutDate);

    // const handleCheckOutChange = (date, dateString) => {
    //     setCheckOutDate(dateString);
    //     console.log("Check-out Date: ", dateString);
    // };

    //handle check date to book

    // console.log(checkinDate, checkoutDate);
    const handleCountDate = (checkInDate, checkOutDate) => {
        if (checkInDate && checkOutDate) {
            const checkIn = dayjs(checkInDate, "DD-MM-YYYY");
            const checkOut = dayjs(checkOutDate, "DD-MM-YYYY");
            const diff = checkOut.diff(checkIn, "day");
            return diff;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        const diff = handleCountDate(checkInDate, checkOutDate);
        setSoNgay(diff);
    }, [checkInDate, checkOutDate]);

    console.log(soNgay);

    const hanldeBooking = () => {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!user) {
            message.warning("Bạn cần đăng nhập để đặt phòng nhé!");
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate("/sign-in");
            }, 1500);
            return;
        }
        if (checkInDate && checkOutDate && soNgay > 0) {
            // console.log("Đặt phòng thành công");
            // console.log("Số khách: ", soKhachChon);
            // console.log("Số ngày: ", soNgay);
            // console.log("Ngày nhận phòng: ", checkInDate);
            // console.log("Ngày trả phòng: ", checkOutDate);
            // console.log(
            //     "Tổng tiền: ",
            //     convertCurrency(giaTien * soNgay, "VND")
            // );
            // console.log("Mã phòng: ", paramsId);
            // console.log("Mã user: ", user.id);
            // Chuyển đổi định dạng ngày cho API
            const formattedCheckInDate = dayjs(
                checkInDate,
                "DD-MM-YYYY"
            ).toISOString();
            const formattedCheckOutDate = dayjs(
                checkOutDate,
                "DD-MM-YYYY"
            ).toISOString();
            booking
                .createBooking({
                    maPhong: paramsId,
                    maNguoiDung: user?.id,
                    ngayDen: formattedCheckInDate,
                    ngayDi: formattedCheckOutDate,
                    soLuongKhach: soKhachChon,
                    // tongTien: giaTien * soNg
                })
                .then((res) => {
                    console.log(res);
                    message.success("Đặt phòng thành công");
                    setTimeout(() => {
                        navigate("/profile");
                    }, 2000);
                })
                .catch((err) => {
                    console.error(
                        "Lỗi đặt phòng: ",
                        err.response ? err.response.data : err.message
                    );
                });
        }
    };

    return (
        <>
            {loading && <SpinnerCustom />}
            <div className="shadow shadow-gray-900/20 box-booking">
                <h2 className="text-xl font-semibold">
                    {convertCurrency(giaTien, "VND")}
                    <span className="text-base">/ đêm</span>
                </h2>

                <div>
                    <div className=" w-full">
                        <div className="mt-3">
                            <label
                                htmlFor=""
                                className="text-black font-semibold"
                            >
                                Nhận phòng
                            </label>
                            <label
                                htmlFor=""
                                className="traphong ml-20 md:ml-52   lg:ml-72  2xl:ml-20 text-black font-semibold"
                            >
                                Trả phòng
                            </label>
                        </div>

                        <RangePicker
                            className={`${styles.customDatePicker} mt-1 w-full text-base focus-within:border-gray-900 rounded-xl text-black border placeholder:text-black border-gray-700 py-2`}
                            onChange={handleDateChange}
                            defaultValue={dayjs()}
                            disabledDate={(current) => {
                                return (
                                    current && current < dayjs().startOf("day")
                                );
                            }}
                            format={"DD-MM-YYYY"}
                            placeholder={[
                                "Chọn ngày nhận phòng",
                                "Chọn ngày trả phòng",
                            ]}
                        />
                    </div>
                    <div className="mt-4 ">
                        <label htmlFor="" className="text-black font-semibold">
                            Số khách
                        </label>
                        <div>
                            <button
                                onClick={() => {
                                    if (soKhachChon > 1) {
                                        setSoKhachChon(soKhachChon - 1);
                                    }
                                }}
                                className="border-gray-900 border px-3 py-1 shadow-sm delay-75 hover:bg-black hover:text-white text-center rounded-full"
                            >
                                -
                            </button>
                            <input
                                className="ml-4 mr-3 pointer-events-none placeholder:text-black border border-gray-700 py-2 rounded-xl px-2 w-1/2"
                                type="number"
                                value={soKhachChon}
                                // placeholder="Chọn số lượng khách"
                            />
                            <button
                                onClick={() => {
                                    if (soKhachChon < soLuongKhach) {
                                        setSoKhachChon(soKhachChon + 1);
                                    }
                                }}
                                className="border-gray-900 border px-3 py-1 delay-75 hover:bg-black hover:text-white text-center rounded-full"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={hanldeBooking}
                        className="w-full py-3 bg-main rounded-xl mt-5 text-white"
                    >
                        Đặt phòng
                    </button>
                </div>

                <div className="mt-4">
                    <p className="text-gray-600">
                        Chính sách và quy định của chúng tôi
                    </p>
                </div>
                <div className="mt-2">
                    <div className="text-gray-800 font-semibold flex justify-between ">
                        <span>{`Bạn sẽ trả ${convertCurrency(
                            giaTien
                        )} x ${soNgay} đêm  `}</span>
                        <span className="font-semibold">
                            {convertCurrency(giaTien * soNgay, "VND")}
                        </span>
                    </div>
                    <p>Cho chỗ ở này tại AirBnb</p>
                    <div className="mt-2">
                        <span className="text-gray-600 underline">
                            * Đã gồm phí dịch vụ và thuế
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingRoom;
