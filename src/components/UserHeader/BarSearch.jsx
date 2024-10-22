import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { DatePicker, Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "../../Icon/IconStorage";
import { setdsViTri, updateValueSearch } from "../../redux/viTriSlice";
import { layViTri } from "../../service/getLocationSearch";
import { useDebounce } from "../../hooks/UseDebounce";
import styles from "./BoxSearch.module.scss";
import { removeVietnameseTones } from "../../utils/removeVietNameseTones";
const BarSearch = ({ show }) => {
  // const lookfor = useSelector((state) => state.viTriReducer.valueSearch);
  // const [focus, setFocus] = useState(false);

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
  // console.log(valueSearch);

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
      <div
        className={` w-2/5 md:w-1/3  search-bar ${
          show ? "visible" : ""
        } flex flex-col justify-center`}
      >
        <div className="flex justify-between items-center gap-2 px-3">
          <div className="w-10/12 ">
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
                type="text"
                onChange={(e) => {
                  // setFocus(true);
                  // console.log(e);
                  setValueSearch(e.target.value);
                }}
                value={valueSearch}
                className="w-full text-gray-700 font-semibold focus-visible:outline-none text-sm placeholder:text-gray-600"
                placeholder="Địa điểm bất kì..."
              />
            </Dropdown>
          </div>
          <div className="w-2/12 sm:-mr-2 md:-mr-4  lg:-mr-5 xl:-mr-7">
            <button
              onClick={(e) => handleSearch(e)}
              type="submit"
              className=" px-2 py-2 bg-red-500  font-bold text-white rounded-full"
            >
              <SearchIcon width="1.2em" height="1.2em" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarSearch;
