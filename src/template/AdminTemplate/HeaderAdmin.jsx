import { Dropdown, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../utils/localStorage";

const HeaderAdmin = () => {
  const user = useSelector((state) => state.authSlice.infoUser);
  console.log(user);
  const adminInfo = getLocalStorage("adminInfo");

  const items = [
    {
      key: user.id.toString(),
      label: (
        <div>
          <h3 className="my-2  text-main text-xl font-semibold">
            Thông tin admin
          </h3>
          <div className="py-2 px-3">ID: {user.id}</div>
          <div className="py-2 px-3">Name: {user.name}</div>
          <div className="py-2 px-3">Email: {user.email}</div>
          <div className="py-2 px-3">Birthday: {user.birthday}</div>
          <div className="py-2 px-3">Phone: {user.phone}</div>
          <div className="py-2 px-3">Role: {user.role ? "ADMIN" : ""}</div>
        </div>
      ),
    },

    {
      key: adminInfo.id.toString(),
      label: (
        <div>
          <div className="py-2 px-3 bg-sky-500 w-full">
            Ngày hết hạn token: {adminInfo.exp}
          </div>
        </div>
      ),
    },
  ];
  return (
    <header className="flex items-center justify-center rounded-lg z-50   px-5 ">
      <Dropdown
        menu={{
          items,
        }}
      >
        <div className="flex items-center justify-center">
          <div className="mr-4">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-10 object-contain h-10 rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold ">
              {user?.name} {user?.role ? "Admin" : ""}
            </p>
          </div>
        </div>
      </Dropdown>
    </header>
  );
};
export default HeaderAdmin;
