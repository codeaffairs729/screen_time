import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
const position: LatLngExpression = [41.8819, -87.6278];

const WorldMap = ({
    locations = [],
    counts = [],
}: {
    locations: Array<LatLngExpression>;
    counts: Array<string>;
}) => {
    return (
        <div>
            <MapContainer
                center={position}
                zoom={4}
                maxZoom={18}
                style={{ width: "100%", height: 444, zIndex: 0 }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location, index) => (
                    <MarkerDisplay
                        key={index}
                        location={location}
                        count={counts[index]}
                    />
                ))}
            </MapContainer>
        </div>
    );
};
export default WorldMap;

const MarkerDisplay = ({
    key,
    location,
    count,
}: {
    key: number;
    location: LatLngExpression;
    count?: string;
}) => {
    return (
        <Marker
            key={key}
            position={location}
            icon={L.divIcon({
                className: "number-icon pt-3",
                iconSize: [50, 60],
                iconAnchor: [19, 53],
                html: count,
            })}
        ></Marker>
    );
};
