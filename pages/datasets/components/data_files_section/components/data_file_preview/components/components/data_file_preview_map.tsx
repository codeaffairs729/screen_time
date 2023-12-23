import ReactDOMServer from "react-dom/server";
import {
    useMap,
    MapContainer,
    TileLayer,
} from "react-leaflet";
import { Feature, Geometry, GeoJSON } from "geojson";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getLatLngBoundsWithPadding } from "./utils";

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
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapFeaturesLayer bounds={outerBounds} data={mapData} />
            </MapContainer>
        </div>
    );
};

const MapFeaturesLayer = ({
    bounds,
    data,
}: {
    bounds: L.LatLngBoundsExpression;
    data: GeoJSON;
}) => {
    const map = useMap();
    map.fitBounds(bounds);
    L.rectangle(getLatLngBoundsWithPadding(map, L.latLngBounds(bounds as any), 10), {
        color: "rgb(179 179 179)",
        weight: 0.5,
        fillColor: "rgb(179 179 179 / 60%)",
    }).addTo(map);
    L.geoJSON(data, {
        style: {
            color: "rgb(110 73 142 / 70%)",
            weight: 2,
            opacity: 0.65,
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                ReactDOMServer.renderToString(
                    <FeaturePopup feature={feature} />
                )
            );
        },
    }).addTo(map);
    return (
        <button
            className="bg-white text-black text-xs font-bold z-[999999999] absolute left-2 bottom-2 p-2 shadow-md"
            onClick={() => map.fitBounds(bounds)}
        >
            CENTER
        </button>
    );
};

/**
 * Popup content
 */
const FeaturePopup = ({ feature }: { feature: Feature<Geometry, any> }) => {
    const { properties } = feature;
    return (
        <div className="overflow-x-auto">
            <table>
                {Object.keys(properties).map((key) => {
                    return (
                        <tr
                            key={key}
                            className="border-b border-gray-100 last:border-0"
                        >
                            <th key={key} className="py-1 pr-2">
                                {key}
                            </th>
                            <td className="py-1 whitespace-nowrap text-xs text-gray-700">
                                {properties[key]}
                            </td>
                        </tr>
                    );
                })}
            </table>
            <span></span>
        </div>
    );
};

export default DataFilePreviewMap;
