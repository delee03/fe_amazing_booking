import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueLocation } from "../../../redux/viTriSlice";

import { Space } from "antd";

const ManagerLocation = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.viTriReducer?.dsViTri || []);

    useEffect(() => {
        dispatch(getValueLocation());
    }, [dispatch]);

    console.log("Locations", locations);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },

        {
            title: "Tên Vị Trí",
            dataIndex: "city",
            key: "tenViTri",
        },

        {
            title: "Quốc Gia",
            dataIndex: "country",
            key: "quocGia",
        },
        {
            title: "Loại Vị Trí",
            dataIndex: "style",
            key: "loaiViTri",
        },
        {
            title: "Vĩ độ",
            dataIndex: "latitude",
            key: "latitude",
        },
        {
            title: "Kinh độ",
            dataIndex: "longitude",
            key: "longitude",
        },
        {
            title: "",
            key: "xoa",
            render: (_, record) => (
                <Space size="middle" className="space-x-3">
                    <button className="bg-yellow-500/85 text-white py-2 px-5">
                        Sửa
                    </button>
                    <button
                        onClick={() => {
                            layViTri.deleteLocation(record.id);
                            message.success({ content: "Xóa thành công" });
                            dispatch(getValueLocation());
                        }}
                        className="bg-red-500/85 text-white py-2 px-5"
                    >
                        Xóa
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div>
                <Table
                    columns={columns}
                    dataSource={locations}
                    rowKey="id"
                ></Table>
            </div>
        </>
    );
};

export default ManagerLocation;
