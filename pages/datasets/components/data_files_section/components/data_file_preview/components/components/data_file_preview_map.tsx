import {
    useMap,
    GeoJSON,
    MapContainer,
    TileLayer,
    Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    LatLngBoundsExpression,
    latLng,
    latLngBounds,
    LatLngBounds,
} from "leaflet";
import { FeatureCollection, GeoJsonObject } from "geojson";

const DataFilePreviewMap = ({
    totalBounds,
    mapData,
    className,
}: {
    totalBounds: number[];
    mapData: any;
    className?: string;
}) => {
    console.log("totalBounds", totalBounds);
    console.log("mapData", mapData);
    const corner1 = latLng(totalBounds[1], totalBounds[0]);
    const corner2 = latLng(totalBounds[4], totalBounds[3]);
    const outerBounds: LatLngBoundsExpression = [
        [totalBounds[1], totalBounds[0]],
        [totalBounds[3], totalBounds[2]],
    ];
    const bounds: LatLngBounds = latLngBounds(corner1, corner2);
    console.log("bounds", bounds);
    console.log("outerBounds", outerBounds);
    return (
        <div>
            <MapContainer className={className} center={corner1} zoom={2} style={{height: 500}}>
                <MapViewControl bounds={outerBounds} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON key="my-geojson" data={mapData} />
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
    return null;
};

export default DataFilePreviewMap;
