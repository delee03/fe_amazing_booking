// Lấy dữ liệu từ props là latitude, longitude, city và hiển thị lên bản đồ
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Cấu hình icon marker tùy chỉnh cho Leaflet
const defaultIcon = new L.Icon({
    iconRetinaUrl: new URL(
        "leaflet/dist/images/marker-icon-2x.png",
        import.meta.url
    ).toString(),
    iconUrl: new URL(
        "leaflet/dist/images/marker-icon.png",
        import.meta.url
    ).toString(),
    shadowUrl: new URL(
        "leaflet/dist/images/marker-shadow.png",
        import.meta.url
    ).toString(),
});
L.Marker.prototype.options.icon = defaultIcon;

const MapLocation = ({ latitude, longitude, city }) => {
    if (!latitude || !longitude || !city) return null;
    const position = [latitude, longitude];

    return (
        /* Bản đồ sử dụng thư viện Leaflet */
        latitude &&
        longitude &&
        city && (
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                    <Popup>{city}</Popup>
                </Marker>
            </MapContainer>
        )
    );
};
export default MapLocation;
