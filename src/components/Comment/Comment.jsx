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
            <div className="grid grid-cols-1  md:grid-cols-2 gap-12">
                {dataComment.map((item, index) => {
                    const date = new Date(item.createdAt);
                    const formattedDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
                        date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    return (
                        <div className="" key={index}>
                            <div className="user flex justify-start items-center gap-6">
                                <img
                                    className="w-12 h-12 rounded-full"
                                    src={item.user.avatar}
                                    alt=""
                                />
                                <div>
                                    <h4 className="font-semibold">
                                        {item.user.name}
                                    </h4>
                                    <p>{formattedDate}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="mt-5 font-semibold text-lg flex gap-4 flex-wrap ">
                                    <p>{item.content}</p>
                                    <div>{item.star} / 5 điểm</div>
                                </div>
                                <div className="flex items-center gap-2 mr-4">
                                    <div className="flex items-center gap-2 mt-3">
                                        <FavoriteRoom1
                                            width="1.2em"
                                            height="1.2em"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center gap-2 mt-3">
                                        {/* <MenuDots
                                            width="1.2em"
                                            height="1.2em"
                                        /> */}
                                        <span className="text-sm font-semibold underline">
                                            Trả lời
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Comment;
