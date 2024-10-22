import React, { useState } from "react";
import {
    BarMenu,
    GlobalIcon,
    SearchIcon,
    UserIcon,
} from "../../Icon/IconStorage";
import style from "./RightHeader.module.scss";
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { getLocalStorage } from "../../utils/localStorage";
import MediaQuery, { useMediaQuery } from "react-responsive";

const RightHeader = () => {
    const isDesktop = useMediaQuery({ minWidth: 1140 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1139 });

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const user = getLocalStorage("user");
    console.log(user);

    const navigate = useNavigate();

    const items = [
        {
            key: "1",
            label: (
                <Link
                    to={path.signin}
                    className="py-2 px-5 w-full rounded-md hover:bg-gray-200 duration-300"
                >
                    Sign in
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link
                    to={path.signup}
                    className="py-2 px-4 w-full rounded-md text-white bg-main border hover:border-red-500  hover:bg-white hover:!text-main "
                >
                    Sign up
                </Link>
            ),
        },
    ];
    const itemsLoggedIn = [
        {
            key: "1",
            label: (
                <Link
                    to="/profile"
                    className="py-3 px-4 w-full rounded-md my-3 hover:bg-gray-200 duration-300"
                >
                    Xem thông tin cá nhân
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link
                    to="/your-favorite-room"
                    className="py-3 px-4  !w-full rounded-md hover:bg-gray-200 duration-300"
                >
                    Phòng yêu thích của bạn
                </Link>
            ),
        },
        {
            key: "3",
            label: (
                <Link
                    to={"/"}
                    className="w-full -mt-2 block py-2 px-10 text-center   rounded-md text-main hover:bg-main hover:text-white duration-300"
                    onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.getItem("adminInfo")
                            ? localStorage.removeItem("adminInfo")
                            : "";
                        navigate("/sign-in");
                        // window.location.reload();
                    }}
                >
                    Đăng xuất
                </Link>
            ),
        },
    ];

    console.log(user);
    const [open, setOpen] = useState(false);
    //hàm xử lí check localStorage

    const handleLoggedIn = () => {
        const infoUserLogin = getLocalStorage("user");
        if (infoUserLogin) {
            return itemsLoggedIn;
        }
        return items;
    };

    return (
        <>
            <div className="flex justify-between gap-3 items-center mt-2 box-user">
                <MediaQuery minWidth={1090}>
                    {" "}
                    <h3 className="text-sm font-semibold text-gray-900">
                        Cho thuê chỗ ở qua AirBnb
                    </h3>
                </MediaQuery>
                <MediaQuery minWidth={550}>
                    <div className="global">
                        <GlobalIcon width="1em" height="1em" />
                    </div>
                </MediaQuery>
                <div className="">
                    <div>
                        <Dropdown
                            overlayClassName={style.customizedDropdown}
                            onClick={() => setOpen(!open)}
                            menu={{
                                items: handleLoggedIn(),
                            }}
                        >
                            <div className="bar-menu">
                                <BarMenu width="1em" height="1em" />
                                {user ? (
                                    <img
                                        src={user.avatar}
                                        className="w-6 h-6 object-contain rounded-full"
                                    />
                                ) : (
                                    <UserIcon width="1.6em" height="1.6em" />
                                )}
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* <Link
                    to={path.signin}
                    className="py-2 px-4 rounded-md hover:bg-gray-200 duration-300"
                >
                    Sign in
                </Link>
                <Link
                    to={path.signup}
                    className="py-2 px-4 rounded-md text-green-500 border-green-500 hover:bg-green-500 hover:text-white duration-300"
                >
                    Sign up
                </Link> */}
        </>
    );
};

export default RightHeader;
