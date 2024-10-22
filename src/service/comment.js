import { http } from "./config";

export const comment = {
    getCommentByRoomId: async (id) => {
        return await http.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`);
    },
    postCommentForRoomId: async (id, data) => {
        return await http.post(`/binh-luan/them-binh-luan/${id}`, data);
    },
    getAllComment: () => {
        return http.get("/binh-luan");
    },
};
