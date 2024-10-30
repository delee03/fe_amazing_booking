import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/localStorage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// import jwt_decode from "jwt-decode";

const SignInGoogle = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = async (response) => {
        try {
            // Lấy Google token từ response
            const googleToken = response.credential;

            console.log(googleToken);

            // Gửi Google token đến backend
            const res = await axios.post("http://localhost:3000/auth/google", {
                token: googleToken,
            });

            // Xử lý phản hồi từ backend và lưu vào localStorage
            const { user, token } = res.data.content;
            setLocalStorage("user", user);
            setLocalStorage("token", token);

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
