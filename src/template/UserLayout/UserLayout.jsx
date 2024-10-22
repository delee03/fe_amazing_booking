import React from "react";
import { LogoMain } from "../../Icon/IconStorage";
import Header from "../../components/UserHeader/Header";
import Footer from "../../components/UserFooter/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const UserLayout = () => {
    const isDesktop = useMediaQuery({ minWidth: 1140 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1139 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const location = useLocation(); // Lấy thông tin về URL hiện tại
    const isHomePage = location.pathname === "/";
    const marginTop =
        isHomePage && isDesktop
            ? "mt-72"
            : isHomePage && isTablet
            ? "mt-56"
            : "mt-24";
    const marginTopForOutlet = isDesktop
        ? "mt-56"
        : isTablet
        ? "mt-56"
        : "mt-24";
    {
        console.log(isHomePage);
    }
    return (
        <>
            <Header />
            <div
                className={`pb-12  ${
                    isHomePage ? marginTop : marginTopForOutlet
                }`}
            >
                <Outlet />
            </div>

            <Footer />
        </>
    );
};

export default UserLayout;
