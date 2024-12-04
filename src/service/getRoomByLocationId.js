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
        return http.post(`/rooms/avatar/${idRoom}`, formData);
    },
    createRoom: (data) => {
        return http.post(`/rooms`, data, {
            headers: {
                token: getTokeStorage("token") || "",
            }, // set token
        });
    },
    deleteRoom: (id) => {
        return http.delete(`/rooms/${id}`, {
            headers: {
                token: getTokeStorage("token") || "",
            },
        });
    },
    uploadRoom: (id, data) => {
        return http.put(`/rooms/${id}`, data);
    },
};
