import React from "react";
import InputCustom from "../../components/Custom/InputCustom";
import { DatePicker, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ButtonCustom from "../../components/Custom/ButtonCustom";
import {
    SvgApple,
    SvgFacebook,
    SvgGoogle,
    SvgEmail,
} from "../SignIn/IconSignUp";
import Lottie from "lottie-react";
import SignUpAnimate from "../../assets/animation/SignUpAnimate.json";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../service/auth.service";
import { setLocalStorage } from "../../utils/localStorage";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";

import SignInGoogle from "../SignIn/SignInWGoogle";

const SignUp = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            password: "",
            gender: true,
            birthday: "",
            role: "USER",
        },
        validationSchema: yup.object({
            name: yup.string().required("Không được bỏ trống họ tên"),
            email: yup
                .string()
                .email("Email không hợp lệ")
                .required("Không được bỏ trống email"),
            phone: yup
                .string()
                .matches(
                    /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/,
                    "Vui lòng nhập đúng sdt Việt Nam"
                )
                .required("Vui lòng nhập đúng SDT Việt Nam"),
            password: yup
                .string()
                .required("Không được bỏ trống password")
                .matches(
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
                    "Password gồm 6-12 ký tự, ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt"
                ),
            gender: yup.boolean().required("vui lòng chọn giới tính"),
            birthday: yup.string().required("Vui lòng chọn ngày sinh"),
        }),
        onSubmit: (values) => {
            console.log(values);
            authService
                .signUp(values)
                .then((res) => {
                    console.log(res);
                    message.success("Đăng ký thành công ", 2);
                    navigate("/sign-in");

                    // setLocalStorage("registerUser", res.data.content);
                })
                .catch((err) => {
                    message.error(`Đăng ký thất bại ${err}`);
                    console.log(err);
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
        <section>
            <div className="max-w-4xl mx-auto w-4/5 md:w-full">
                <div className="mt-4 flex px-12 md:px-0 flex-col-reverse md:flex-row items-center justify-bewtween shadow-2xl rounded-2xl relative">
                    <div className="w-full md:w-1/2 h-screen">
                        <Lottie animationData={SignUpAnimate} loop={true} />
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className=" w-full  md:w-1/2 ml-5 mr-7 pb-3 pt-3 h-screen"
                        action=""
                    >
                        <h2 className="font-bold text-center text-main text-3xl mb-5">
                            ĐĂNG KÝ TÀI KHOẢN
                        </h2>
                        <InputCustom
                            label={"Họ và Tên"}
                            name={"name"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            touched={touched.name}
                            value={values.name}
                            placehoder={"Vui lòng nhập Họ và Tên"}
                            typeInput=""
                        />
                        <InputCustom
                            label={"Email"}
                            name={"email"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            touched={touched.email}
                            value={values.email}
                            placehoder={"Vui lòng nhập Email"}
                            typeInput=""
                        />
                        {/* 
                        <InputCustom
                            label={"Mật Khẩu"}
                            name={"password"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password}
                            touched={touched.password}
                            value={values.password}
                            placehoder={"Vui lòng nhập mật khẩu"}
                            typeInput="password"
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
                        <InputCustom
                            placehoder={"Vui lòng nhập sdt"}
                            label={"Số điện thoại"}
                            onBlur={handleBlur}
                            touched={touched.phone}
                            error={errors.phone}
                            value={values.phone}
                            onChange={handleChange}
                            name={"phone"}
                            id={"phone"}
                        />
                        <div className="flex justify-between gap-3">
                            <div className="mb-2 w-3/6">
                                <label className="block mb-2 ml-1 text-sm font-medium text-gray-900">
                                    Chọn giới tính
                                </label>
                                <select
                                    name="gender"
                                    onBlur={handleBlur}
                                    touched={touched.gender}
                                    id="gender"
                                    onChange={handleChange}
                                    value={values.gender}
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5 py-2"
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                                {touched.gender && errors.gender ? (
                                    <p className="text-red-500 py-2">
                                        {errors.gender}
                                    </p>
                                ) : null}
                            </div>

                            <div className="w-3/6">
                                <label className="block mb-2 ml-1 text-sm font-medium text-gray-900">
                                    Chọn ngày sinh
                                </label>
                                <DatePicker
                                    name="birthday"
                                    format={"DD-MM-YYYY"}
                                    defaultValue={dayjs(
                                        "01-01-2015",
                                        "DD-MM-YYYY"
                                    )}
                                    value={
                                        values.birthday
                                            ? dayjs(
                                                  values.birthday,
                                                  "DD-MM-YYYY"
                                              )
                                            : null
                                    }
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full px-2.5 py-2"
                                    onChange={(date, dateString) => {
                                        console.log(dateString);
                                        // values.birthday = dateString || "";
                                        setFieldValue(
                                            "birthday",
                                            dateString || ""
                                        );
                                    }}
                                />
                                {touched.birthday && errors.birthday ? (
                                    <p className="text-red-500 py-2">
                                        {errors.birthday}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <ButtonCustom
                            onClick={handleSubmit}
                            type="submit"
                            content={"Đăng Ký"}
                            bgColor={"bg-main"}
                            bgHover="hover:bg-red-800"
                        />
                        <div className="flex justify-between items-center">
                            <div className="w-full h-0 bg-black border border-black mr-2"></div>
                            <span className="text-center text-md block p-0 m-0">
                                OR
                            </span>
                            <div className="w-full h-0 bg-black border border-black ml-2"></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <h2 className="mx-auto">
                                Đã có tài khoản ?{" "}
                                <Link
                                    className="text-red-500 hover:text-red-800"
                                    to="/sign-in"
                                >
                                    Đăng nhập
                                </Link>
                            </h2>
                        </div>
                        <div className="flex justify-around mt-4 w-6/6 gap-6 mx-auto">
                            <div className="flex justify-around items-center w-full py-2 px-4 duration-300 font-semibold hover:bg-black hover:text-white tran bg-white border border-gray-400 rounded-lg">
                                {/* <span className="w-5 h-5">
                                    <SvgGoogle />
                                </span> */}
                                <SignInGoogle />
                            </div>
                            <button className="flex justify-between items-center w-full py-2 px-4 duration-300 font-semibold hover:bg-black hover:text-white bg-white border border-gray-400 rounded-lg">
                                <span className="w-5 h-5">
                                    <SvgFacebook />
                                </span>
                                <p>Facebook</p>
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-4 w-4/6 gap-6 mx-auto">
                            <button className="flex justify-around items-center w-full py-2 px-4 duration-300 font-semibold hover:bg-black hover:text-white bg-white border border-gray-400 rounded-lg">
                                <span className="w-5 h-5">
                                    <SvgApple />
                                </span>
                                <p>Apple</p>
                            </button>
                            <button className="flex justify-around items-center w-full py-2 px-4 duration-300 font-semibold hover:bg-black hover:text-white bg-white border border-gray-400 rounded-lg">
                                <span className="w-5 h-5">
                                    <SvgEmail />
                                </span>
                                <p>Email</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
