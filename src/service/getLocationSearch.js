import { http } from "./config";

export const layViTri = {
  //  GET

  getListLocation: async () => {
    return await http.get("/vi-tri");
  },

  // DELETE

  deleteLocation: (id) => {
    return http.delete(`/vitri/${id}`);
  },

  // POST
  createLocation: () => {
    return http.post();
  },

  // PUT
  updateLocation: () => {
    return http.put();
  },
};
