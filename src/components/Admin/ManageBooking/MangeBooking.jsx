import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MangeBooking = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button
                className="bg-red-500 py-5 px-2 text-white"
                onClick={() => {
                    navigate("/admin/booking-manage/chi-tiet-dat-phong");
                }}
            >
                Quản lý đặt phòng
            </button>
            <Outlet />
        </div>
    );
};

export default MangeBooking;
