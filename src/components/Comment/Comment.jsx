import React, { useEffect, useState } from "react";
import {
    FavoriteRoom,
    FavoriteRoom1,
    MenuDots,
    Sharing,
} from "../../Icon/IconStorage";
import { comment } from "../../service/comment";

const Comment = ({ paramsId }) => {
    const [dataComment, setDataComment] = useState([]);
    useEffect(() => {
        comment
            .getCommentByRoomId(paramsId)
            .then((res) => {
                // console.log(res);
                setDataComment(res.data.content);
            })
            .catch((err) => {
                console.log("Đã có lỗi khi get comment", err);
            });
    }, [paramsId]);
    return (
        <>
            <h3 className="font-semibold text-2xl my-5 mt-10">
                Bình luận <span>({dataComment.length})</span>
            </h3>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-10">
                {dataComment.map((item, index) => (
                    <div className="" key={index}>
                        <div className="user flex justify-start items-center gap-6">
                            <img
                                className="w-12 h-12 rounded-full"
                                src={item.avatar}
                                alt=""
                            />
                            <div>
                                <h4 className="font-semibold">
                                    {item.tenNguoiBinhLuan}
                                </h4>
                                <p>{item.ngayBinhLuan}</p>
                            </div>
                        </div>
                        <div className="mt-5 font-semibold text-lg">
                            <p>{item.noiDung}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comment;
