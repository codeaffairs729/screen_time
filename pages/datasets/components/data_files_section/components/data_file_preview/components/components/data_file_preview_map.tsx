import {
    useMap,
    GeoJSON,
    MapContainer,
    TileLayer,
    Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

const DataFilePreviewMap = ({
    totalBounds,
    mapData,
    className,
}: {
    totalBounds: number[];
    mapData: any;
    className?: string;
}) => {
    const center = L.latLng(
        (totalBounds[1] + totalBounds[0]) / 2,
        (totalBounds[3] + totalBounds[2]) / 2
    );
    const outerBounds: L.LatLngBoundsExpression = [
        [totalBounds[1], totalBounds[0]],
        [totalBounds[3], totalBounds[2]],
    ];

    return (
        <div>
            <MapContainer
                className={className}
                center={center}
                zoom={2}
                style={{ height: 500 }}
            >
                <MapViewControl bounds={outerBounds} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={mapData} />
                <Rectangle
                    bounds={outerBounds}
                    pathOptions={{ color: "grey" }}
                />
            </MapContainer>
        </div>
    );
};

const MapViewControl = ({ bounds }: { bounds: any }) => {
    const map = useMap();
    map.fitBounds(bounds);
    return (
        <button
            className="bg-white text-black font-bold z-[999999999] absolute left-2 bottom-2 p-2 shadow-md"
            onClick={() => map.fitBounds(bounds)}
        >
            CENTER
        </button>
    );
};

export default DataFilePreviewMap;