import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserIcon, UserIcon2 } from "../../Icon/IconStorage";

const UserInfo = ({ info }) => {
    const userInfo = useSelector((state) => state.authSlice.infoUser);
    const [avatar, setAvatar] = useState(null);
    // // const [step, setStep] = useState(0);
    // const handleUploadAvatar = (event) => {
    //     event.preventDefault();
    //     // Chuyển đổi dữ liệu vào formData
    //     let formData = new FormData();
    //     formData.append("formFile", avatar.file);
    //     let { token } = infoUser;
    //     console.log(token);
    //     nguoiDungService
    //         .uploadAvatar(token, formData)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // console.log(avatar);

    return (
        <>
            <div className="flex flex-col items-center justify-center ">
                {/* Avatar */}
                <form onSubmit="">
                    <div className="w-32 h-32  flex items-center justify-center">
                        {!info.avatar ? (
                            <UserIcon2 width="8em" height="8em" />
                        ) : (
                            <img
                                className="w-32 h-32 rounded-full object-contain border-4 border-yellow-500"
                                src={info.avatar}
                            ></img>
                        )}
                    </div>
                    {/* <input
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            if (e.target.files[0]) {
                                setAvatar({
                                    file: e.target.files[0],
                                    preview: URL.createObjectURL(
                                        e.target.files[0]
                                    ),
                                });
                            }
                        }}
                        type="file"
                        placeholder="Vui lòng cập nhật ảnh"
                        className="ml-4  mt-5 "
                        accept="image/png, image/jpeg, image/jpg"
                    /> */}
                </form>
                {/* Xác minh danh tính */}
            </div>
            {/* Thông tin xác nhận */}
            <div className="mt-10 flex justify-center flex-col ">
                <h3 className="font-bold">
                    <span>{info?.name}</span> đã xác nhận
                </h3>
                <ul className="list-disc pl-4">
                    <li>Địa chỉ email</li>
                </ul>
                <button className="mt-4 bg-main hover:bg-white font-semibold hover:text-main hover:border-red-500 hover:border delay-150 text-white py-2 px-4 rounded-md ">
                    Nhận huy hiệu
                </button>
            </div>
        </>
    );
};

export default UserInfo;
