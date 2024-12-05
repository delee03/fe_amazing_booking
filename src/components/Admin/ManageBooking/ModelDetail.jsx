import { Modal, message } from "antd";
import React from "react";
import { LogoMain } from "../../../Icon/IconStorage";
import jsPDF from "jspdf";

const ModelDetail = ({ record, isModalVisible, handleModalClose }) => {
    const myFont = new FontFace("Times", "url(/public/times.ttf)"); // Tải font chữ từ file .ttf

    // Hàm để tạo PDF từ nội dung trong Modal
    const handleDownloadPDF = () => {
        if (!record) {
            message.error("Không có dữ liệu để in");
            return;
        }

        // Tạo một đối tượng jsPDF mới
        const doc = new jsPDF();
        // add the font to jsPDF
        doc.addFileToVFS("MyFont.ttf", myFont);
        doc.addFont("MyFont.ttf", "MyFont", "normal");
        doc.setFont("MyFont");
        // Thêm logo vào PDF với kích thước và vị trí
        const imageWidth = 100; // Chiều rộng của ảnh
        const imageHeight = 50; // Chiều cao của ảnh
        doc.addImage(
            "/public/main-logo.png",
            "PNG",
            10,
            10,
            imageWidth,
            imageHeight
        ); // Đặt ảnh ở vị trí (10,10) với kích thước 100x50

        // Thiết lập font chữ và kích thước
        // Thử dùng font "times" thay vì "Times"
        doc.setFontSize(14); // Đặt kích thước font chữ

        // Thêm tiêu đề vào PDF
        doc.setFontSize(24); // Tiêu đề lớn hơn
        doc.text("Thông tin hóa đơn", 10, 70); // Đặt tiêu đề ở vị trí (10,70)

        // Thêm thông tin booking vào PDF
        doc.setFontSize(16); // Kích thước font chữ cho thông tin chi tiết
        doc.setFont("times", "normal"); // Đặt lại font
        doc.text(`Booking ID: ${record.id}`, 10, 80);
        doc.text(`User ID: ${record.userId}`, 10, 90);
        doc.text(`Phòng: ${record.room?.name}`, 10, 100);
        doc.text(`Mô tả: ${record.room?.description}`, 10, 110);
        doc.text(`Tổng tiền: ${record?.totalPrice} VNĐ`, 10, 120);
        doc.text(`Ngày nhận phòng: ${record.formattedDateIn}`, 10, 130);
        doc.text(`Ngày trả phòng: ${record.formattedDateOut}`, 10, 140);
        doc.text(`Người đặt phòng: ${record.user?.name}`, 10, 150);
        doc.text(`Thông tin liên hệ: ${record.user?.phone}`, 10, 160);
        doc.text(`Email: ${record.user?.email}`, 10, 170);
        doc.text(
            `Trạng thái thanh toán: ${
                record.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"
            }`,
            10,
            180,
            { maxWidth: 180 }, // Đảm bảo text không bị vượt quá chiều rộng
            { align: "left" }
        );

        // Lưu file PDF
        doc.save(`HoaDon_${record.id}.pdf`);
    };

    return (
        <>
            <Modal
                title={<LogoMain />}
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {record && (
                    <>
                        <div className="py-3 px-4">
                            <div className="flex items-center">
                                <h3 className="text-main px-3 w-9/12 mb-4 font-semibold text-2xl text-center">
                                    Thông tin hóa đơn
                                </h3>
                                <div className="w-3/12">
                                    <button
                                        onClick={() => {
                                            handleDownloadPDF(); // Gọi hàm tạo và tải PDF
                                            handleModalClose(); // Đóng Modal
                                        }}
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
                                <strong>Mô tả:</strong>
                                <p className="truncate">
                                    {record.room?.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Tổng tiền:</strong>
                                <p className="text-blue-700">
                                    {record?.totalPrice} VNĐ
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Ngày nhận phòng:</strong>
                                <p>{record.formattedDateIn}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Ngày trả phòng:</strong>
                                <p>{record.formattedDateOut}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Người đặt phòng:</strong>
                                <p>{record.user?.name}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Thông tin liên hệ:</strong>
                                <p>{record.user?.phone}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Email:</strong>
                                <p>{record.user?.email}</p>
                            </div>
                            <div className="flex justify-between items-center gap-3 mb-3 w-full">
                                <strong>Trạng thái thanh toán:</strong>
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
