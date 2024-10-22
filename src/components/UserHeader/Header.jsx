import React, { useEffect, useState } from "react";
import { AirbnbSmall, LogoMain } from "../../Icon/IconStorage";
import "./Header.scss";
import RightHeader from "./RightHeader";
import BoxSearch from "./BoxSearch";
import BarSearch from "./BarSearch";
import NavBar from "./NavBar";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation(); // Lấy thông tin về URL hiện tại
    // State để kiểm tra xem có cần hiển thị thanh search không
    const [showSearchBar, setShowSearchBar] = useState(false);
    // Xác định có phải là trang chủ không
    const isHomePage = location.pathname === "/";
    //console.log(isHomePage);

    const isDesktop = useMediaQuery({ minWidth: 1140 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1139 });

    const isMobile = useMediaQuery({ maxWidth: 767 });
    // Sử dụng useEffect để gắn sự kiện scroll khi component mount
    useEffect(() => {
        if (isHomePage) {
            //hàm sử lý sự kiện scroll
            const handleScroll = () => {
                if (window.scrollY > 100) {
                    setShowSearchBar(true);
                } else {
                    setShowSearchBar(false);
                }
            };
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        } else {
            // Nếu không phải trang chủ, luôn hiển thị thanh tìm kiếm mặc định
            setShowSearchBar(true);
        }
    }, [isHomePage, isDesktop, isTablet, isMobile]);

    console.log("Tablet", isTablet);
    console.log("Desktop", isDesktop);
    console.log("Mobile", isMobile);
    console.log(showSearchBar);
    return (
        <>
            <header
                className={`${
                    !showSearchBar && isDesktop
                        ? "min-height-box-search"
                        : "min-height-bar-search"
                } main-header text-center `}
            >
                <div className="flex justify-between -mx-5 md:mx-2 lg:mx-4">
                    <div className="mt-3 text-red-500">
                        <Link to="/">
                            {/* <LogoMain /> */}
                            <AirbnbSmall width="2.5em" height="3em" />
                        </Link>
                    </div>
                    <RightHeader />
                </div>
                {!showSearchBar && isDesktop ? (
                    <BoxSearch />
                ) : isTablet ? (
                    <BarSearch show={isTablet} />
                ) : null}

                {/*                
                    // <MediaQuery minWidth={1140}>
                    //     <BoxSearch />
                    // </MediaQuery> */}

                {/* Thanh search sẽ được hiển thị khi state showSearchBar = true */}
                {showSearchBar && isMobile ? (
                    <BarSearch show={isMobile} />
                ) : showSearchBar && isDesktop ? (
                    <BarSearch show={isDesktop} />
                ) : null}
                <MediaQuery minWidth={768}>
                    <div className="my-4 container">
                        <NavBar />
                    </div>
                </MediaQuery>
            </header>
        </>
    );
};

export default Header;
