import React, { useEffect, useState } from "react";
import { SvgFacebook, SvgGoogle, SvgApple, SvgEmail } from "./IconSignUp.jsx";
import InputCustom from "../../components/Custom/InputCustom";
import axios from "axios";
import { http } from "../../service/config.js";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, message } from "antd";
import { authService } from "../../service/auth.service.js";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { setLocalStorage } from "../../utils/localStorage.js";
import { updateInfoUser, updateAvatarUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

import SignInGoogle from "./SignInWGoogle.jsx";

const SignIn = () => {
    // const [data, setData] = useState([]);
    // const navigate = useNavigate();
    // const [value, setValue] = useState({
    //   email: "",
    //   password: "",
    // });

    // useEffect(() => {
    //   authService
    //     .signIn(value)
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
    const dispatch = useDispatch();

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
            // .matches(
            //     /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
            //     "Password gồm 6-12 ký tự, ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt"
            // ),
        }),
        onSubmit: (values) => {
            console.log(values);
            authService
                .signIn(values)
                .then((res) => {
                    setLocalStorage("user", res.data.content.user);
                    setLocalStorage("role", res.data.content.user.role);
                    setLocalStorage("token", res.data.token); //check role user or admin từ token
                    message.success("Đăng nhập thành công", 2);
                    dispatch(updateInfoUser(res.data.content.user));
                    navigate("/");
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    message.error(err.response.data.message, 2);
                });
        },
    });

    const {
        handleSubmit,
        values,
        handleBlur,
        handleChange,
        touched,
        errors,
        setFieldValue,
    } = formik;

    return (
        <section className="">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                {/* Modal Content */}
                <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="absolute text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    {/* Header */}
                    <h2 className="text-center text-xl font-semibold mb-6">
                        Đăng nhập
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

                        {/* <InputCustom
                            id={"password"}
                            label={"Password"}
                            name={"password"}
                            onChange={handleChange}
                            value={values.password}
                            error={errors.password}
                            onBlur={handleBlur}
                            placehoder={"Vui lòng nhập password"}
                        /> */}
                        <div className="mb-2">
                            <label className="block mb-2 ml-1 text-sm font-medium text-gray-900">
                                Mật khẩu
                            </label>
                            <Input.Password
                                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5 py-2"
                                placeholder="Vui lòng nhập password"
                                name="password"
                                onChange={(event) => {
                                    setFieldValue(
                                        "password",
                                        event.target.value
                                    );
                                }}
                                onBlur={handleBlur}
                                value={values.password ? values.password : ""}
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                            />
                            {touched.password && errors.password ? (
                                <p className="text-red-500 py-2">
                                    {errors.password}
                                </p>
                            ) : null}
                        </div>

                        <p className="text-sm text-black mt-2 mb-2">
                            Bấm vào để
                            <Link
                                to="/sign-up"
                                className="text-black font-semibold ml-1 underline"
                            >
                                Đăng ký
                            </Link>
                        </p>
                        {/* SignIn Button */}
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full focus:bg-white focus:text-main focus:border-red-500 focus:border delay-150 bg-main text-white font-semibold py-2 rounded-md mb-6 hover:bg-red-800"
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
                    <div className="space-y-3">
                        <a
                            href="https://www.google.com/"
                            className="flex items-center justify-around border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100"
                        >
                            <button className="">
                                <SvgFacebook />
                            </button>
                            <div className="">Đăng nhập với Facebook</div>
                            <div className=""></div>
                        </a>
                        <div
                            href=""
                            className="flex items-center justify-around border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100"
                        >
                            {/* <SvgGoogle /> */}

                            <SignInGoogle />

                            <div className=""></div>
                        </div>
                        <a
                            href="https://www.apple.com/vn/"
                            className="flex items-center justify-around border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100"
                        >
                            <button className="">
                                <SvgApple />
                            </button>
                            <div className="">Đăng nhập với Apple</div>
                            <div className=""></div>
                        </a>
                        <a
                            href="https://mail.google.com/"
                            className="flex items-center justify-around border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100"
                        >
                            <button className="">
                                <SvgEmail />
                            </button>
                            <div className="">Đăng nhập với Email</div>
                            <div className=""></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
