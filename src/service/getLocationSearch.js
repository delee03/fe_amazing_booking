import { http } from "./config";

export const layViTri = {
    //  GET

    getListLocation: () => {
        return http.get("/locations");
    },

    // DELETE

    deleteLocation: (id) => {
        return http.delete(`/locations/${id}`);
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
