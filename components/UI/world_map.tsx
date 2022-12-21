import { MapContainer, TileLayer } from "react-leaflet";

const WorldMap = () => {
    return (
        <div>
            <MapContainer
                zoom={13}
                center={[51.505, -0.09]}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};
export default WorldMap;
