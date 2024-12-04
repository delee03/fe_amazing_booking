import { Modal } from "antd";
import React from "react";

const ModelDetail = ({ record, isModalVisible, handleModalClose }) => {
    return (
        <>
            <Modal
                title="Chi tiết đặt phòng"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {record && (
                    <>
                        <div className="py-3 px-4">
                            <div className="flex items-center">
                                <h3 className="text-main px-3 w-9/12 mb-4 font-semibold text-2xl  text-center ">
                                    Thông tin hóa đơn
                                </h3>
                                <div className=" w-3/12">
                                    <button
                                        onClick={handleModalClose}
                                        className="bg-red-500 text-white mb-3 hover:text-main border hover:bg-white hover:border-red-500 border- px-3 py-1 rounded-xl"
                                    >
                                        In hóa đơn
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Booking_Id:</strong>
                                <p>{record.id}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>User_Id:</strong>
                                <p>{record.userId}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Phòng:</strong>
                                <p className="font-semibold">
                                    {record.room?.name}
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Mô tả phòng:</strong>{" "}
                                <p>{record.room?.description}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Tổng tiền:</strong>
                                <p className="text-blue-700">
                                    {record?.totalPrice} VNĐ
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Ngày nhận phòng:</strong>{" "}
                                <p> {record.formattedDateIn}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Ngày trả phòng:</strong>{" "}
                                <p>{record.formattedDateOut}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Người đặt phòng:</strong>{" "}
                                <p>{record.user?.name}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Thông tin liên hệ:</strong>{" "}
                                <p>{record.user?.phone}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Email:</strong>{" "}
                                <p>{record.user?.email}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Trạng thái thanh toán:</strong>{" "}
                                <p
                                    className={`${
                                        record.paymentStatus
                                            ? "text-green-500 font-semibold"
                                            : "text-red-600 font-semibold"
                                    }`}
                                >
                                    {record.paymentStatus
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default ModelDetail;
