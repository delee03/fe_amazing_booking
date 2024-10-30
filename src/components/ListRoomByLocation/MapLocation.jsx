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
    const position = [latitude, longitude];

    return (
        <MapContainer
            className="z-0"
            center={position}
            zoom={13}
            style={{ height: "600px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>{city}</Popup>
            </Marker>
        </MapContainer>
    );
};
export default MapLocation;
