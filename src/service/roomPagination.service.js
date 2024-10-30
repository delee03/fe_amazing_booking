import { http } from "./config";

export const roomPagination = {
    getRoomPagination: (index, size) => {
        return http.get(`/rooms/room-pagination?`, {
            params: {
                pageIndex: index,
                pageTake: size,
            },
        });
    },
};

//return http.get(`/rooms/room-pagination?pageIndex=${index}&pageTake=${size}`);
