import React, { useEffect, useState } from "react";

import InputCustom from "../../components/Custom/InputCustom";

import { Link } from "react-router-dom";
import { authService } from "../../service/auth.service.js";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { setLocalStorage } from "../../utils/localStorage";
import { HandleAuth } from "../Auth/HandleAuth.jsx";
import { message } from "antd";

const AdminLogin = () => {
    // const [data, setData] = useState([]);
    // const navigate = useNavigate();
    // const [value, setValue] = useState({
    //   email: "",
    //   password: "",
    // });

    // useEffect(() => {
    //   authService
    //     .AdminLogin(value)
    //     .then((res) => {
    //       console.log(res);
    //       navigate("/");
    //     })
    //     .catch();
    // }, [value]);

    // const handleSubmit = () => {
    //   console.log(value);
    // };

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Email không hợp lệ")
                .required("Không được bỏ trống email"),
            password: yup.string().required("Không được bỏ trống password"),
        }),
        onSubmit: (values) => {
            console.log(values);
            authService
                .signIn(values)
                .then((res) => {
                    setLocalStorage("user", res.data.content.user);
                    setLocalStorage("role", res.data.content.user.role);
                    setLocalStorage("token", res.data.content.token); //check role user or admin từ token
                    const checkPermission = HandleAuth();
                    if (checkPermission) {
                        message.success("Chào mừng admin đã quay trở lại", 2);
                        setTimeout(() => {
                            navigate("/admin");
                        }, 1000);
                    } else {
                        message.warning("Nào về nhà nhé", 2);
                        setTimeout(() => {
                            navigate("/");
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log("Có lỗi đăng nhập rồi IT ơi", err);
                });
        },
    });

    const { handleSubmit, values, handleBlur, handleChange, touched, errors } =
        formik;

    return (
        <section className="">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                {/* Modal Content */}
                <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
                    {/* Close Button */}
                    <button
                        type="button"
                        className="absolute text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    {/* Header */}
                    <h2 className="text-center text-xl font-semibold mb-6">
                        Nào hãy cho tôi thấy bạn là admin nào
                    </h2>
                    <div className="border-b-2 mb-2"></div>
                    <form action="" onSubmit={handleSubmit}>
                        {/* Email Input */}

                        {/* <input
            type="text"
            placeholder="email:"
            value={value.email}
            id="email"
            onChange={(e) => {
              const id = e.target.id;
              console.log(e.target.value);
              setValue({ ...value, [id]: e.target.value });
            }}
          /> */}
                        <InputCustom
                            id={"email"}
                            label={"Email"}
                            name={"email"}
                            onChange={handleChange}
                            value={values.email}
                            error={errors.email}
                            onBlur={handleBlur}
                            placehoder={"Vui lòng nhập email"}
                        />

                        {/* Password Input */}

                        {/* <input
            placeholder="mat khau"
            type="password"
            id="password"
            value={value.password}
            onChange={(e) => {
              const id = e.target.id;
              console.log(e.target.value);
              setValue({ ...value, [id]: e.target.value });
            }}
          /> */}
                        <InputCustom
                            id={"password"}
                            label={"Password"}
                            name={"password"}
                            onChange={handleChange}
                            value={values.password}
                            error={errors.password}
                            onBlur={handleBlur}
                            placehoder={"Vui lòng nhập password"}
                        />

                        <p className="text-sm text-black mt-2 mb-2">
                            Bấm vào để
                            <a
                                href="#"
                                className="text-black font-semibold ml-1 underline"
                            >
                                Đăng ký
                            </a>
                        </p>
                        {/* AdminLogin Button */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full bg-main text-white font-semibold py-2 rounded-md mb-6 hover:bg-red-500"
                        >
                            Đăng nhập
                        </button>
                    </form>
                    {/* Border OR Border */}
                    <div className="flex items-center mb-6">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="text-gray-500 px-3">hoặc</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>
                    {/* Social Buttons */}
                    <div className="w-full">
                        <Link to="/">
                            <button className="flex w-full items-center justify-center  border py-2 px-5 border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-main delay-100">
                                Về trang chủ thoi
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;
