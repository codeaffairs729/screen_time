import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldLow";

const MapChartComponent = ({ isMobile, totalBounds }: { isMobile: boolean, totalBounds: any }) => {
    const coOrdinates = totalBounds.flat(1)
    useEffect(() => {
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldHigh;

        // Pre-zoom the map
        // chart.homeZoomLevel = 2;
        // chart.homeGeoPoint = {
        //     latitude: totalBounds[1][0],
        //     longitude: totalBounds[1][1]
        // };

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        // coOrdinates&&createRectangleFromArray(coOrdinates)
        function createRectangleFromArray(coordsArray:any) {
            if (coordsArray.length !== 4) {
                throw new Error("Input array must contain exactly 4 elements: [lat1, long1, lat2, long2]");
            }

            const lat1 = coordsArray[0];
            const lng1 = coordsArray[1];
            const lat2 = coordsArray[2];
            const lng2 = coordsArray[3];

            // Create the rectangle shape data
            const rectangleData = [{
                "title": "Rectangle",
                "geoPolygon": [[
                    { "latitude": lat1, "longitude": lng1 }, // Vertex 1
                    { "latitude": lat1, "longitude": lng2 }, // Vertex 2
                    { "latitude": lat2, "longitude": lng2 }, // Vertex 3
                    { "latitude": lat2, "longitude": lng1 }, // Vertex 4
                    { "latitude": lat1, "longitude": lng1 }  // Closing vertex to complete the polygon
                ]]
            }];

            return rectangleData;
        }

        var shapeSeries = chart.series.push(new am4maps.MapPolygonSeries());
        shapeSeries.data = createRectangleFromArray(coOrdinates)
          

        var shapeTemplate = shapeSeries.mapPolygons.template;
        shapeTemplate.stroke = am4core.color("#");
        shapeTemplate.strokeWidth = 2;
        shapeTemplate.fill = shapeTemplate.stroke;
        shapeTemplate.fillOpacity = 0.2;
        shapeTemplate.nonScalingStroke = true;

        return () => {
            chart.dispose();
        };
    }, [totalBounds]);

    return <div id="chartdiv" style={{ width: "100%", height: isMobile ? "328px" : "500px" }}>
    </div>;
};

export default MapChartComponent;
