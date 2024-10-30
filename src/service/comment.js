import { http } from "./config";

export const comment = {
    getCommentByRoomId: async (id) => {
        return await http.get(`/ratings/room/${id}`);
    },
    postCommentForRoomId: async (id, data) => {
        return await http.post(`/ratings/them-binh-luan/${id}`, data);
    },
    getAllComment: () => {
        return http.get("/ratings");
    },
};
