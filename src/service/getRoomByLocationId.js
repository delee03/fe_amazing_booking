import { getTokeStorage } from "../utils/localStorage";
import { http } from "./config";

export const getRoomByLocationId = {
    getAllRoomRealEstate: () => {
        return http.get(`/rooms`);
    },

    getAllRoom: (id) => {
        return http.get(`/rooms/room-by-location/${id}`);
    },
    getRoomById: (id) => {
        return http.get(`/rooms/room-by-id/${id}`);
    },
    upLoadRoomImage: (idRoom, formData) => {
        return http.post(
            `/phong-thue/upload-hinh-phong?maPhong=${idRoom}`,
            formData,
            {
                headers: {
                    token: getTokeStorage("token") || "",
                },
            }
        );
    },
    createRoom: (data) => {
        return http.post(`/phong-thue`, data, {
            headers: {
                token: getTokeStorage("token") || "",
            },
        });
    },
    deleteRoom: (id) => {
        return http.delete(`/phong-thue/${id}`, {
            headers: {
                token: getTokeStorage("token") || "",
            },
        });
    },
    uploadRoom: (id, data) => {
        return http.put(`/phong-thue/${id}`, data, {
            headers: {
                token: getTokeStorage("token") || "",
            },
        });
    },
};
