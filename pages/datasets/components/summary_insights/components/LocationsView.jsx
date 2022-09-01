import {
    MapContainer,
    TileLayer,
    Rectangle,
    Marker,
    Popup,
} from "react-leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "./MarkerClusterGroup";
import { markerIcon } from "./MarkerClusterGroup";

const LocationsView = ({ data }) => {
    return (
        <div className="mx-auto">
            <MapContainer
                center={[0, 0]}
                zoom={1}
                style={{ height: 300, width: 500 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {data.map((item, idx) => {
                        return (
                            <Marker
                                key={idx}
                                position={[item["latitude"], item["longitude"]]}
                                icon={markerIcon}
                            />
                        );
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default LocationsView;
