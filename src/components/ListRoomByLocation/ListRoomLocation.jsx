import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FavoriteRoom, Liked, Reputation } from "../../Icon/IconStorage";
import { getRoomByLocationId } from "../../service/getRoomByLocationId";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCustom from "../Custom/SpinnerCustom";
import { convertCurrency } from "../../common/convertCurrency";
import { message, Tooltip } from "antd";
import { handleRoomFavorite } from "../../redux/roomFavoriteSlice";
import { useMediaQuery } from "react-responsive";
import "leaflet/dist/leaflet.css";
import { fetchGetLocationById } from "../../redux/viTriSlice";
import MapLocation from "./MapLocation";

const ListRoomLocation = () => {
    const valueSearch = useSelector((state) => state.viTriReducer.valueSearch);
    const [searchParam, setSearchParam] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    let idLocation = searchParam.get("idLocation");
    // console.log(idLocation);
    const [rooms, setRooms] = useState([]);
    const dispatch = useDispatch();
    const roomLiked = useSelector(
        (state) => state.roomFavoriteReducer.roomFavorite
    );
    //  console.log(roomLiked);

    const navigate = useNavigate();
    const handleIsFavoriteRoom = (id) => {
        const check = roomLiked.find((item) => item.id === id);
        if (check) {
            return true;
        }
        return false;
    };

    const locationData = useSelector((state) => state.viTriReducer.viTriId);
    console.log(locationData);

    useEffect(() => {
        // Gọi API lấy vị trí từ idLocation
        dispatch(fetchGetLocationById(idLocation));

        // Gọi API lấy danh sách phòng theo vị trí từ idLocation

        getRoomByLocationId
            .getAllRoom(idLocation)
            .then((res) => {
                const data = res.data.content;
                setRooms(data);

                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Kiểm tra và chuyển đổi `latitude` và `longitude` thành số
        if (locationData.latitude && locationData.longitude) {
            setLocation({
                latitude: parseFloat(locationData.latitude),
                longitude: parseFloat(locationData.longitude),
                city: locationData.city,
            });
            setLoading(false);
        }
    }, [idLocation, locationData]);
    //console.log(searchParam.get("idLocation"));
    //cần có 1 useEffect để gọi api lấy danh sách phòng theo vị trí từ idLocation
    // Sử dụng useEffect để hiển thị thông báo sau khi thêm vào yêu thích
    const handleLikeRoom = (item) => {
        dispatch(handleRoomFavorite(item));

        // Kiểm tra xem phòng đã được thêm vào yêu thích chưa
        const check = handleIsFavoriteRoom(item.id);
        if (check) {
            message.warning({
                content: (
                    <span className="font-semibold text-base">
                        Đã xóa phòng khỏi danh sách yêu thích của bạn
                    </span>
                ),
                duration: 2,
            });
        } else {
            message.success({
                content: (
                    <span className="font-semibold py-4 text-base">
                        Đã thêm vào phòng yêu thích của bạn.
                        <a
                            onClick={() => navigate(`/your-favorite-room`)}
                            style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            Xem danh sách phòng
                        </a>
                    </span>
                ),
                duration: 2,
            });
        }
    };

    // Sử dụng useEffect để hiển thị thông báo sau khi thêm vào yêu thích
    // useEffect(() => {
    //     if (addedRoom) {
    //         message.success({
    //             content: (
    //                 <span className="font-semibold py-4">
    //                     Đã thêm vào phòng yêu thích của bạn.
    //                     <a
    //                         onClick={() => navigate(`/your-favorite-room`)}
    //                         style={{
    //                             textDecoration: "underline",
    //                             cursor: "pointer",
    //                         }}
    //                     >
    //                         Xem danh sách phòng
    //                     </a>
    //                 </span>
    //             ),
    //             duration: 2,
    //         });

    //         // Reset addedRoom sau khi thông báo hiển thị
    //         setAddedRoom(null);
    //     }
    // }, [addedRoom]); // Chỉ chạy effect khi addedRoom thay đổi

    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>
            {loading && <SpinnerCustom />}

            <section>
                {/* <h1>Đây là trang danh sách phòng theo vị trí</h1>
            <h2>Id của vị trí: {idLocation}</h2> */}
                <div
                    className="max-w-full lg:max-w-6xl"
                    style={{ maxWidth: "1470px", margin: "0 auto" }}
                >
                    <div
                        className={`block  xl:flex justify-between items-start  gap-7 ${
                            isMobile && "space-y-10"
                        }`}
                    >
                        <div className="w-full  xl:w-7/12">
                            <div className="flex items-center justify-center 2xl:justify-start gap-3 ">
                                <h2 className="font-semibold lg:text-3xl text-center text-2xl  lg:text-center  2xl:text-left ">
                                    Các chỗ ở tại khu vực {valueSearch}
                                </h2>
                                <Reputation width="1.8em" height="1.8em" />
                            </div>
                            <span className="text-base 2xl:text-left text-center text-gray-600 block my-5">
                                Hơn {rooms?.length} chỗ ở
                            </span>
                            <div
                                className={`
                            ${isTablet && "px-32 gap-x-7"}
                               ${
                                   isMobile && "px-7"
                               } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-14  `}
                            >
                                {rooms?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="max-h-64 mb-24 w-full"
                                    >
                                        <div className="relative w-full  h-64">
                                            <img
                                                className="w-full h-full object-cover rounded-2xl"
                                                src={item.avatar}
                                                alt=""
                                            />
                                            <Tooltip
                                                title={
                                                    handleIsFavoriteRoom(
                                                        item.id
                                                    )
                                                        ? "Bỏ thích"
                                                        : "Yêu thích"
                                                }
                                            >
                                                <span
                                                    className=" absolute top-3 right-6 "
                                                    style={{
                                                        backdropFilter:
                                                            "invert(.1)",
                                                    }}
                                                    onClick={() => {
                                                        handleLikeRoom(item);
                                                    }}
                                                >
                                                    {handleIsFavoriteRoom(
                                                        item.id
                                                    ) ? (
                                                        <Liked
                                                            width="2em"
                                                            height="2em"
                                                        />
                                                    ) : (
                                                        <FavoriteRoom
                                                            width="2em"
                                                            height="2em"
                                                        />
                                                    )}
                                                </span>
                                            </Tooltip>
                                        </div>
                                        <Link to={`room-detail/${item.id}`}>
                                            <h3 className="font-semibold mt-3 min-h-12">
                                                {item.name}
                                            </h3>
                                            <div className="flex justify-between my-2">
                                                <span className="text-gray-600">
                                                    Số khách: {item.soKhach}
                                                </span>
                                                <h5 className=" text-gray-600 mr-3 ">
                                                    Số phòng: {item.soLuong}
                                                </h5>
                                            </div>

                                            <h4 className="font-semibold">
                                                {convertCurrency(item.price)} /
                                                đêm
                                            </h4>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className={`${
                                isMobile && "mt-28"
                            } map w-full xl:w-5/12 h-screen `}
                        >
                            {location ? (
                                <MapLocation
                                    latitude={location.latitude}
                                    longitude={location.longitude}
                                    city={location.city}
                                />
                            ) : (
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22048138.81715737!2d1.0141049065281622!3d47.57901010729313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ed8886cfadda85%3A0x72ef99e6b3fcf079!2zQ2jDonUgw4J1!5e0!3m2!1svi!2s!4v1726925750926!5m2!1svi!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ListRoomLocation;
