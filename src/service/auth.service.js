import { http } from "./config";
export const authService = {
  signIn: (data) => {
    return http.post("/auth/signin", data);
  },
  signUp: (data) => {
    return http.post("/auth/signup", data);
  },
  getInfoUser: async (id) => {
    return await http.get(`/users/${id}`);
  },
  getReservations: async (idUser) => {
    return await http.get(`/dat-phong/lay-theo-nguoi-dung/${idUser}`);
  },
};
