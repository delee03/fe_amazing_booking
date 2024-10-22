import React, { useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../../redux/nguoiDungSlice";
import { fetchAllRooms } from "../../../redux/roomDetailSlice";
import { layViTri } from "../../../service/getLocationSearch";
import { setdsViTri } from "../../../redux/viTriSlice";
import { getComments } from "../../../redux/commentSlice";
import { booking } from "../../../service/booking.service";
import { updateAllBooking } from "../../../redux/reservationSlice";

// Đăng ký các thành phần cần thiết với Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Dữ liệu số liệu cho biểu đồ

const PolarAreaChart = () => {
  const dispatch = useDispatch();
  const arrNguoiDung = useSelector(
    (state) => state.nguoiDungSlice.listNguoiDung
  );
  const arrPhong = useSelector((state) => state.roomDetailReducer.arrRooms);
  const arrViTri = useSelector((state) => state.viTriReducer.dsViTri);
  const arrDanhGia = useSelector((state) => state.commentSlice.dsDanhGia);
  const arrBoking = useSelector(
    (state) => state.reservationReducer.arrAllBooking
  );

  console.log(arrNguoiDung.length);
  console.log(arrPhong.length);
  console.log(arrViTri.length);
  console.log(arrDanhGia.length);
  console.log(arrBoking.length);
  // const arrPhong = useSelector((state) => state.phongSlice.listPhong);
  // const arrDonDat = useSelector((state) => state.donDatSlice.listDonDat);
  // const arrDanhGia = useSelector((state) => state.danhGiaSlice.listDanhGia);
  // const arrDiaDiem = useSelector((state) => state.diaDiemSlice.listDiaDiem);
  // let soLuongNguoiDung = arrNguoiDung.lenght;
  // console.log(soLuongNguoiDung);

  useEffect(() => {
    dispatch(getValueUserApi());
    dispatch(fetchAllRooms());
    layViTri
      .getListLocation()
      .then((res) => {
        const data = res.data.content;
        console.log(data);
        dispatch(setdsViTri(data));
      })
      .catch((err) => {
        console.log("Lỗi khi gọi api lấy vị trí", err);
      });
    booking
      .getAllBooking()
      .then((res) => {
        console.log(res.data.content);
        dispatch(updateAllBooking(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getComments());
  }, []);

  const data = {
    labels: [
      "Người dùng",
      "Đánh giá",
      "Tổng địa điểm",
      "Đơn đã đặt",
      "Tổng phòng",
    ],
    datasets: [
      {
        label: "Thống kê",
        data: [
          arrNguoiDung.length,

          arrDanhGia.length,
          arrViTri.length,
          arrBoking.length,
          arrPhong.length,
        ], // Số liệu thực tế của bạn
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(75, 0, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <h2 className="text-center font-bold text-3xl text-main my-5">
        Thống kê Số liệu - Bảng điều khiển Admin
      </h2>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarAreaChart;
