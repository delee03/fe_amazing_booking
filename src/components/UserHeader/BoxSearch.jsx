import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "../../Icon/IconStorage";
import { layViTri } from "../../service/getLocationSearch";
import { useDebounce } from "../../hooks/UseDebounce";
import { setdsViTri, updateValueSearch } from "../../redux/viTriSlice";
import { DownOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker, Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BoxSearch.module.scss";
import { removeVietnameseTones } from "../../utils/removeVietNameseTones";
import SpinnerCustom from "../Custom/SpinnerCustom";
import { date } from "yup";
import dayjs from "dayjs";

const BoxSearch = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [valueSearch, setValueSearch] = useState("");
  const [param, setParam] = useState(null);
  const dsViTri = useSelector((state) => state.viTriReducer.dsViTri);
  const navigate = useNavigate();
  //lấy dữ liệu state từ store
  const debounce = useDebounce(valueSearch, 500);
  // console.log(debounce);

  const [items, setItem] = useState([
    {
      key: "1",
      label: (
        <h2 className="font-semibold text-xl">
          Hãy nhập địa điểm bạn muốn đến nè
        </h2>
      ),
    },
  ]);
  //console.log(dsViTri);

  useEffect(() => {
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
  }, []);

  // Lắng nghe sự thay đổi của valueSearch để filter dữ liệu create 1 new array để render ra dropdown
  useEffect(() => {
    let filterItems = [...dsViTri];
    if (debounce) {
      filterItems = [...dsViTri].filter((item) =>
        removeVietnameseTones(item.tenViTri)
          .toLowerCase()
          .trim()
          .includes(removeVietnameseTones(debounce).toLowerCase().trim())
      );
    }

    const updateItems = filterItems.map((item) => {
      return {
        key: item.id.toString(),
        label: (
          <Link
            onClick={() => {
              console.log(item.id);
              setValueSearch(
                item.tenViTri + " - " + item.tinhThanh + " - " + item.quocGia
              );
              setParam(item.id);
              dispatch(
                updateValueSearch(
                  item.tenViTri + " - " + item.tinhThanh + " - " + item.quocGia
                )
              );
            }}
            className="flex items-center justify-between px-3 rounded-lg py-4"
          >
            <img
              src={item.hinhAnh}
              alt=""
              className="w-12 h-12 object-cover rounded-lg"
            />
            <h3>
              {item.tenViTri} - {item.tinhThanh}
            </h3>
          </Link>
        ),
      };
    });
    setItem(updateItems);
  }, [debounce]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (param) {
      navigate(`/list-room-by-location?idLocation=${param}`);
    } else {
      console.log("Vui lòng chọn một địa điểm");
    }
  };

  return (
    <>
      <div style={{ marginTop: "-39px" }}>
        <h2 className="mb-5 mt-1">
          <span className="text-black font-bold text-lg mr-2 ">Chỗ ở</span>{" "}
          <span className="text-gray-600 text-lg ml-2">Trải nghiệm</span>
        </h2>
        <div className="box-search w-3/5 mx-auto ">
          <div
            className="flex items-center justify-evenly"
            style={{ marginLeft: "-10px" }}
          >
            <div className="w-4/12 pl-4 search-item ">
              <label htmlFor="" className="search-title">
                Địa điểm
              </label>
              <Dropdown
                menu={{
                  items,
                }}
                overlayClassName={
                  items.length > 2
                    ? styles.customDropdownMenuFull
                    : styles.customDropdownMenuSearching
                }
                // open={open}
                onOpenChange={() => {
                  setOpen(!open);
                }}
                placement="bottomLeft"
                trigger={["click"]}
              >
                <input
                  className="w-full  focus-visible:outline-none placeholder:text-gray-500 placeholder:text-base"
                  type="text"
                  value={valueSearch}
                  onChange={(e) => {
                    e.preventDefault();
                    // console.log(e.target.value);
                    setValueSearch(e.target.value);
                    // setOpen(!open);
                  }}
                  // onMouseOver={() => setOpen(true)}
                  // onClick={() => setOpen(!open)}
                  // onMouseOut={() => setOpen(false)}
                  placeholder="Tìm kiếm điểm đến"
                />
              </Dropdown>
              {/*   //  nhập và so sánh valueSearch với keyword thì filter ra dropdown => cần có 1 biến quản lí items trong dropdown 
                            còn nếu người dùng nhập sai hoặc so sánh trong useSelector trả về không thấy tên vị trí
                            đó thì sẽ xuất hiện thanh dropdown tất cả vị trí cho người chọn 
                           */}
            </div>
            <div className="w-2/12 search-item border-l-2 border-gray-200 px-4">
              <label htmlFor="" className="search-title">
                Nhận phòng
              </label>

              <DatePicker
                format={"DD/MM/YYYY"}
                // onChange={(date, dateString) => {
                //     console.log(dateString);
                // }}
                // defaultValue={dayjs()}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
                placeholder="Thêm ngày"
                className={`${styles.customDatePicker} max-w-full outline-none focus-within:border-none focus-visible:outline-none !placeholder:text-gray-800 placeholder:text-base`}
              />
            </div>
            <div className="w-2/12 search-item border-l-2 border-gray-200 px-4">
              <label htmlFor="" className="search-title">
                Trả phòng
              </label>

              <DatePicker
                format={"DD/MM/YYYY"}
                disabledDate={(pastday) => {
                  return pastday && pastday <= dayjs().startOf("day");
                }}
                placeholder="Thêm ngày"
                className={`${styles.customDatePicker} max-w-full outline-none focus-within:border-none focus-visible:outline-none !placeholder:text-gray-800 placeholder:text-base`}
              />
            </div>
            <div className="w-4/12 search-item pl-4 flex items-center justify-between border-l-2 border-gray-200">
              <div className="w-10/12 ">
                <label htmlFor="" className="search-title">
                  Khách
                </label>
                <input
                  type="text"
                  className="w-full focus-visible:outline-none placeholder:text-gray-500 placeholder:text-base"
                  placeholder="Thêm khách"
                  readOnly={true}
                />
              </div>
              <div className="w-2/12">
                <button
                  onClick={(e) => handleSearch(e)}
                  type="submit"
                  className=" px-3 py-3 bg-red-500  font-bold text-white rounded-full"
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxSearch;
