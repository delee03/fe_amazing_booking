import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Liked } from "../../Icon/IconStorage";
import { Link } from "react-router-dom";
import { convertCurrency } from "../../common/convertCurrency";
import { Skeleton } from "antd";

const YourFavoriteRoom = () => {
    const roomFavorite = useSelector(
        (state) => state.roomFavoriteReducer.roomFavorite
    );
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <>
            {loading ? (
                <Skeleton active className="!h-screen" />
            ) : (
                <section className="container">
                    <h2 className="font-bold text-3xl text-main pb-4  mb-4 text-center">
                        Danh sách phòng yêu thích của bạn
                    </h2>
                    {roomFavorite.lenght == 0 ? (
                        <h2 className="text-3xl font-bold mt-4 text-red-500 ">
                            Bạn không có phòng yêu thích nào
                        </h2>
                    ) : (
                        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-14  ">
                            {roomFavorite?.map((item, index) => (
                                <div
                                    key={index}
                                    className="max-h-64 mb-24 w-full"
                                >
                                    <div className="relative w-full  h-64">
                                        <img
                                            className="w-full h-full object-cover rounded-2xl"
                                            src={item.hinhAnh}
                                            alt=""
                                        />

                                        <span
                                            className=" absolute top-3 right-6 "
                                            style={{
                                                backdropFilter: "invert(.1)",
                                            }}
                                        >
                                            <Liked width="2em" height="2em" />
                                        </span>
                                    </div>
                                    <Link
                                        to={`/list-room-by-location/room-detail/${item.id}`}
                                    >
                                        <h3 className="font-semibold mt-3 min-h-12">
                                            {item.tenPhong}
                                        </h3>
                                        <div className="flex justify-between my-2">
                                            <span className="text-gray-600">
                                                Số khách: {item.khach}
                                            </span>
                                            <h5 className=" text-gray-600 ">
                                                Giường đôi: {item.giuong}
                                            </h5>
                                        </div>

                                        <h4 className="font-semibold">
                                            {convertCurrency(item.giaTien)}
                                            /đêm
                                        </h4>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </>
    );
};

export default YourFavoriteRoom;
