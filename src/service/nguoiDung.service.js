import { getTokeStorage } from "../utils/localStorage";
import { http } from "./config";

export const nguoiDungService = {
    getListUser: async () => {
        return await http.get("/users");
    },
    // NV2 : Tạo hàm xử lí gọi API xóa người dùng
    // DELETE
    deleteUser: (id) => {
        return http.delete(`/users?id=${id}`);
    },
    // POST
    createUser: (data) => {
        return http.post("/users", data);
    },
    // PUT
    updateUser: async (id, data) => {
        console.log("Update User Params:", id, data); // Check params before sending request
        return await http.put(`/users/${id}`, data);
    },
    //POST
    uploadAvatar: async (formData) => {
        return await http.post("/users/upload-avatar", formData, {
            headers: {
                token: getTokeStorage("token") || "",
            },
        });
    },
    //
};
