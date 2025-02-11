import { http } from "./config";
export const booking = {
    createBooking: (data) => {
        return http.post("/booking", data);
    },
    update: (id, data) => {
        return http.put(`/booking/${id}`, data);
    },
    delete: (id) => {
        return http.delete(`/booking/${id}`);
    },
    getVnpayUrl: (bookingId, amount, ip) => {
        return http.get(
            `/booking/vnpay-url/${bookingId}?amount=${amount}&ip=${ip}`
        );
    },
    getAllBooking: () => {
        return http.get("/booking");
    },
    getBookingByRoomId: (id) => {
        return http.get(`/booking/room/${id}`);
    },
    getBookingByUserId: (id) => {
        return http.get(`/booking/user/${id}`);
    },
    getBookingByHostId: (id) => {
        return http.get(`/booking/host/${id}`);
    },
    getBookingByStatus: (status) => {
        return http.get(`/booking/status/${status}`);
    },
    updateStatus: (id, status) => {
        return http.put(`/booking/status/${id}`, status);
    },
    getBookingByHostIdAndStatus: (id, status) => {
        return http.get(`/booking/host/${id}/status/${status}`);
    },
    getBookingByUserIdAndStatus: (id, status) => {
        return http.get(`/booking/user/${id}/status/${status}`);
    },
    getBookingByRoomIdAndStatus: (id, status) => {
        return http.get(`/booking/room/${id}/status/${status}`);
    },
    getBookingByHostIdAndRoomId: (hostId, roomId) => {
        return http.get(`/booking/host/${hostId}/room/${roomId}`);
    },
    getBookingByHostIdAndRoomIdAndStatus: (hostId, roomId, status) => {
        return http.get(
            `/booking/host/${hostId}/room/${roomId}/status/${status}`
        );
    },
    getBookingByUserIdAndRoomId: (userId, roomId) => {
        return http.get(`/booking/user/${userId}/room/${roomId}`);
    },
    getBookingByUserIdAndRoomIdAndStatus: (userId, roomId, status) => {
        return http.get(
            `/booking/user/${userId}/room/${roomId}/status/${status}`
        );
    },
    getBookingByUserIdAndHostId: (userId, hostId) => {
        return http.get(`/booking/user/${userId}/host/${hostId}`);
    },
};
