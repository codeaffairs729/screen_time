import L from "leaflet";

export const getLatLngBoundsWithPadding = (map: L.Map, bounds: L.LatLngBounds, padding: number) => {
    var topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
        bottomRight = map.latLngToLayerPoint(bounds.getSouthEast()),
        paddedTopLeft = L.point(topLeft.x - padding, topLeft.y - padding),
        paddedBottomRight = L.point(
            bottomRight.x + padding,
            bottomRight.y + padding
        );

    return L.latLngBounds(
        map.layerPointToLatLng(paddedTopLeft),
        map.layerPointToLatLng(paddedBottomRight)
    );
};
