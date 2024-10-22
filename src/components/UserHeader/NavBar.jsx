import React from "react";
import {
    BeachFront,
    Breakfast,
    Cabin,
    Camping,
    LandScape,
    Mansion,
    Pool,
    Skiing,
    Snowing,
    Surf,
    Ticket,
    Trending,
} from "../../Icon/IconStorage";
import { Link } from "react-router-dom";
import { message } from "antd";

const handleScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    message.warning({
        content: (
            <span className="font-semibold text-base">
                Bạn hãy chọn địa điểm ở box search nhé
            </span>
        ),
        duration: 3,
    });
};

const NavBar = () => {
    return (
        <nav className="container">
            <ul>
                <li>
                    <Link
                        onClick={handleScrollToTop}
                        className="nav-item active"
                    >
                        <div className="mx-auto min-h-full">
                            <Ticket />
                        </div>
                        <h4>Biểu tượng</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Surf />
                        </div>
                        <h4>Lướt sóng</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <LandScape />
                        </div>
                        <h4>Khung cảnh tuyệt vời</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Cabin />
                        </div>
                        <h4>Cabin</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Breakfast />
                        </div>
                        <h4>Phục vụ bữa sáng</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <BeachFront />
                        </div>
                        <h4>Hướng biển</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Skiing />
                        </div>
                        <h4>Trượt tuyết</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Mansion />
                        </div>
                        <h4>Biệt thự</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Snowing />
                        </div>
                        <h4>Bắc cực</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Trending />
                        </div>
                        <h4>Được ưa chuộng nhất</h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Camping />
                        </div>
                        <h4>Khu cắm trại </h4>
                    </Link>
                </li>
                <li>
                    <Link onClick={handleScrollToTop} className="nav-item">
                        <div className="mx-auto min-h-full">
                            <Pool />
                        </div>
                        <h4>Hồ bơi</h4>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
