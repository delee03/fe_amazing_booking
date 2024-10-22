import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoomById } from "../../redux/roomDetailSlice";
import SpinnerCustom from "../Custom/SpinnerCustom";

import "./RoomDetail.scss";
import {
    FavoriteRoom,
    FavoriteRoom1,
    MenuDots,
    Sharing,
} from "../../Icon/IconStorage";

import BookingRoom from "../BookingRoom/BookingRoom";
import Comment from "../Comment/Comment";
import { useMediaQuery } from "react-responsive";

const RoomDetail = () => {
    const viTriRoom = useSelector((state) => state.viTriReducer.valueSearch);
    // console.log(viTriRoom);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    // console.log(params);
    const dispatch = useDispatch();
    const { room } = useSelector((state) => state.roomDetailReducer);
    console.log(room);
    useEffect(() => {
        //dispatch action lấy thông tin chi tiết phòng theo id
        setTimeout(() => {
            dispatch(fetchRoomById(params.id));
            setLoading(false);
        }, 1000);
    }, [params.id, dispatch]);

    //cần 1 param.id => lấy id phòng cần đặt (done)
    //cần lấy được mã user từ localstorage đã đăng nhập
    // số lượng khách từ input người dùng chọn
    //lấy được giá trị ngày từ ô chọn ngày đi và ngày đến

    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1139 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>
            {loading && <SpinnerCustom />}
            <section className="room-detail">
                <div className="container">
                    <div>
                        <div className="flex justify-between items-center gap-1 mt-6 lg:-mt-10 flex-col sm:flex-row ">
                            <h2 className="font-semibold text-2xl mt-3  lg:mt-0 md:text-2xl 2xl:text-3xl my-4">
                                {room.tenPhong}
                            </h2>
                            <div className="flex justify-between items-center flex-row sm:flex-col lg:flex-row ">
                                <div className="flex justify-between items-center gap-1 hover:bg-gray-200 hover:rounded-xl px-3 py-2">
                                    <Sharing width="1.2em" height="1.2em" />
                                    <span className="text-sm font-semibold underline ">
                                        Chia sẻ
                                    </span>
                                </div>
                                <div className="flex justify-between items-center gap-1 hover:bg-gray-200 hover:rounded-xl px-3 py-2">
                                    <FavoriteRoom1
                                        width="1.2em"
                                        height="1.2em"
                                    />
                                    <span className="text-sm font-semibold underline">
                                        Yêu thích
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className=" relative h-96">
                            <img
                                src={room.hinhAnh}
                                className="w-full h-full object-cover rounded-2xl"
                                alt={room.tenPhong}
                            />
                            <button className=" absolute right-4 bottom-5 hover:bg-black ease-in-out  delay-100 hover:text-white flex items-center gap-2 px-3 py-1 text-lg font-semibold rounded-lg border bg-white border-gray-800">
                                <MenuDots />
                                <span>Hiển thị tất cả ảnh</span>
                            </button>
                        </div>
                        <div className="info-room flex mt-8 justify-between gap-4">
                            <div className="w-8/12 description">
                                <h2 className="font-semibold text-xl lg:text-2xl mb-5 lg:mb-4 2xl:mb-0 ">
                                    Phòng tọa lạc tại
                                    {viTriRoom
                                        ? ` ${viTriRoom}`
                                        : " vị trí đắc địa và yên bình"}
                                </h2>
                                <div className="block w-full lg:w-2/4 xl:w-3/5 xl:flex justify-between items-center  -mt-2">
                                    <h3 className="font-semibold text-base text-gray-600">
                                        {room.khach} khách
                                    </h3>
                                    <span className="mb-2 text-2xl font-bold text-gray-600 ">
                                        .
                                    </span>
                                    <p className="font-semibold text-base text-gray-600">
                                        {room.giuong} giường
                                    </p>
                                    <span className="mb-2 text-2xl font-bold text-gray-600 ">
                                        .
                                    </span>
                                    <p className="font-semibold text-base text-gray-600">
                                        {room.phongTam} phòng tắm đầy đủ
                                    </p>
                                    <span className="mb-2 text-2xl font-bold text-gray-600 ">
                                        .
                                    </span>
                                    <p className="font-semibold text-base text-gray-600">
                                        {room.phongNgu} phòng ngủ
                                    </p>
                                    <span className="mb-2 text-2xl font-bold text-gray-600 ">
                                        .
                                    </span>
                                    <p className="font-semibold text-base text-gray-600">
                                        {room.dieuHoa ? "Có" : "Không"} điều hòa
                                    </p>
                                </div>
                                <div>
                                    <h3>Mô tả</h3>
                                    <p className="text-gray-600">{room.moTa}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-2xl my-6">
                                        Các tiện nghi trong phòng
                                    </h3>
                                    <div className="grid grid-cols-2 text-lg font-semibold">
                                        <div>
                                            <ul>
                                                <li>
                                                    <span>Máy giặt</span>
                                                </li>
                                                <li>
                                                    <span>Wifi</span>
                                                </li>
                                                <li>
                                                    <span>Tivi</span>
                                                </li>
                                                <li>
                                                    <span>Bàn ủi</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>
                                                    <span>Hồ bơi</span>
                                                </li>
                                                <li>
                                                    <span>Đỗ xe</span>
                                                </li>
                                                <li>
                                                    <span>Bếp</span>
                                                </li>
                                                <li>
                                                    <span>Điều hòa</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Comment paramsId={params.id} />
                            </div>
                            <div className="w-4/12 booking-room">
                                <BookingRoom
                                    soLuongKhach={room.khach}
                                    giaTien={room.giaTien}
                                    paramsId={params.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RoomDetail;
