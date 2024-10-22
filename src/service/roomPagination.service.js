import { http } from "./config";

export const roomPagination = {
    getRoomPagination: (index, size) => {
        return http.get(`/phong-thue/phan-trang-tim-kiem`, {
            params: {
                pageIndex: index,
                pageSize: size,
            },
        });
    },
};
