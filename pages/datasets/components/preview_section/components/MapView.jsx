import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapViewControl({ totalBounds }) {
    const map = useMap();
    map.fitBounds(totalBounds);
    return null
}

const MapView = ({ totalBounds }) => {
    const mapCenter = [
        (totalBounds[0][0] + totalBounds[1][0]) / 2,
        (totalBounds[0][1] + totalBounds[1][1]) / 2,
    ];
    return (
        <MapContainer
            center={mapCenter}
            zoom={2}
            style={{ height: 300, width: 300 }}
        >
            <MapViewControl totalBounds={totalBounds} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Rectangle bounds={totalBounds} pathOptions={{ color: "black" }} />
        </MapContainer>
    );
};

export default MapView;
