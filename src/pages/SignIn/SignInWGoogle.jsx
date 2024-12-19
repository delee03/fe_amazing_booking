import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/localStorage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { updateInfoUser } from "../../redux/authSlice";

// import jwt_decode from "jwt-decode";

const SignInGoogle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginSuccess = async (response) => {
        try {
            // Lấy Google token từ response
            const googleToken = response.credential;

            console.log(googleToken);

            // Gửi Google token đến backend
            const res = await axios.post(
                "http://http://booking-alb-1209022085.ap-southeast-1.elb.amazonaws.com/auth/google",
                {
                    token: googleToken,
                }
            );

            // Xử lý phản hồi từ backend và lưu vào localStorage
            const { user, token } = res.data.content;
            dispatch(updateInfoUser(user));
            console.log(res);
            setLocalStorage("user", user);
            setLocalStorage("token", token);

            message.success("Đăng nhập thành công", 3);
            // Điều hướng đến trang chủ
            navigate("/");
        } catch (error) {
            console.error("Google Sign-In failed:", error);
        }
    };

    const handleLoginFailure = (error) => {
        console.log("Login Failed:", error);
    };

    return (
        <div className="flex justify-between items-center gap-10">
            {/* <h2>Sign in with Google</h2> */}
            {/* <SvgGoogle /> */}

            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
            />
        </div>
    );
};

export default SignInGoogle;
