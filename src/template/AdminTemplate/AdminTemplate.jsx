import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, message, Skeleton, theme, Tooltip } from "antd";
import HeaderAdmin from "./HeaderAdmin";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Admin.module.scss";
import { Airbnb, AirbnbSmall, LogoMain } from "../../Icon/IconStorage";
import { HandleAuth } from "../../pages/Auth/HandleAuth";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const hanldeClick = (e) => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin về URL hiện tại
    const isAdminPage = location.pathname.includes("admin");
    const havePermission = HandleAuth(); // Thay thế bằng logic kiểm tra đăng nhập thực tế
    if (isAdminPage) {
        // Logic để chuyển hướng đến trang admin-login nếu chưa đăng nhập
        // Ví dụ: kiểm tra token hoặc trạng thái đăng nhập
        useEffect(() => {
            if (!havePermission) {
                message.warning(
                    "Bạn không có quyền truy cập vào trang này nhé",
                    3
                );
                localStorage.removeItem("user");
                localStorage.removeItem("token");

                setTimeout(() => {
                    // window.location.href = "/admin-login";
                    navigate("/admin-login");
                }, 1000);
            } else {
                console.log("Chào mừng admin quay trở lại");
                message.success("Chào mừng admin đã quay trở lại", 3);
                navigate("/admin");
            }
        }, []);
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <Layout className="min-h-screen layout-admin">
            {loading ? (
                <Skeleton active className="!h-screen" />
            ) : (
                <>
                    <Sider
                        className={styles.customedSider}
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                    >
                        <Link
                            to={"/"}
                            className="block demo-logo-vertical py-5 ml-8"
                        >
                            {!collapsed ? (
                                // <Airbnb width="17rem" height="3.5em" />
                                <LogoMain />
                            ) : (
                                <AirbnbSmall width="5.5em" height="3.5em" />
                            )}
                        </Link>
                        <div className={styles.menuWrapper}>
                            <Menu
                                className={styles.customedMenu}
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                items={[
                                    {
                                        key: "1",
                                        icon: (
                                            <i className="fa-solid fa-chart-simple"></i>
                                        ),
                                        label: (
                                            <Link to={""}>
                                                Bảng điều khiển{" "}
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: "2",
                                        icon: (
                                            <i className="fa-regular fa-user"></i>
                                        ),
                                        label: (
                                            <Link to={"user-manage"}>
                                                Quản lý người dùng
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: "3",
                                        icon: (
                                            <i className="fa-solid fa-briefcase"></i>
                                        ),
                                        label: (
                                            <Link to={"location-manage"}>
                                                {" "}
                                                Quản lý địa điểm
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: "4",
                                        icon: (
                                            <i className="fa-solid fa-briefcase"></i>
                                        ),
                                        label: (
                                            <Link to={"room-manage"}>
                                                Quản lý phòng
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: "5",
                                        icon: (
                                            <i className="fa-regular fa-handshake"></i>
                                        ),
                                        label: (
                                            <Link to={"booking-manage"}>
                                                Quản lí đặt phòng
                                            </Link>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                                padding: 0,
                                background: colorBgContainer,
                            }}
                        >
                            <div className="flex justify-between mx-3">
                                <Button
                                    type="text"
                                    icon={
                                        collapsed ? (
                                            <MenuUnfoldOutlined />
                                        ) : (
                                            <MenuFoldOutlined />
                                        )
                                    }
                                    onClick={() => hanldeClick()}
                                    style={{
                                        fontSize: "16px",
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                                <HeaderAdmin />
                            </div>
                        </Header>
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </>
            )}
        </Layout>
    );
};
export default AdminTemplate;
