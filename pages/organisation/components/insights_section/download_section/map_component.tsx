import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const MapChartComponent = ({ regions, isMobile }: { regions: any, isMobile :boolean}) => {
  useEffect(() => {
    // Create map instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Create map polygon series
    let polygonSeries = new am4maps.MapPolygonSeries();
    chart.zoomControl = new am4maps.ZoomControl();
    chart.height = isMobile?328:656;
    chart.width = isMobile?280:760;
    chart.zoomControl.align = isMobile?"right":"left"; // Set alignment (right side)
    chart.zoomControl.valign = "top"; // Set vertical alignment (bottom)
    // chart.zoomControl.slider.height = 100; // Set the height of the zoom slider
    chart.zoomControl.plusButton.disabled = false;
    chart.zoomControl.plusButton.background.fill = am4core.color(!isMobile?"#ffffff":"#28A197");
    chart.zoomControl.minusButton.background.fill = am4core.color(!isMobile ? "#ffffff" : "#28A197");
    // chart.zoomControl.minusButton.background.fill = am4core.color(!isMobile ? "#ffffff" : "#28A197");
    // chart.zoomControl.minusButton.background.fill = am4core.color(!isMobile ? "#ffffff" : "#28A197");


    // Apply hover effect to the zoom-in button
    chart.zoomControl.plusButton.adapter.add("fill", (fill, target) => {
      if (target.isHover) {
        return am4core.color("#008800"); // Change color on hover
      }
      return fill;
    });
    chart.series.push(polygonSeries);
    // Exclude Antarctica
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());

    // Create a circle image in image series template so it gets replicated to all new images
    var imageSeriesTemplate = imageSeries.mapImages.template;
    var marker = imageSeriesTemplate.createChild(am4core.Image);
    marker.fill = am4core.color("#kkkkkk");
    marker.stroke = am4core.color("#FFFFFF");
    marker.width = isMobile?20:16;
    marker.height = isMobile?20:16;
    marker.strokeWidth = 2;
    marker.nonScaling = true;
    marker.tooltipText = "{title}";
    marker.propertyFields.href = "icon"; // URL of the icon image


    // Set property fields
    imageSeriesTemplate.propertyFields.latitude = "latitude";
    imageSeriesTemplate.propertyFields.longitude = "longitude";
    const data = regions?.map((item: any, index: number) => {
      return {
        "latitude": item.location[0].lat,
        "longitude": item.location[0].long,
        "title": item.count,
        "icon": isMobile ? "/images/icons/location_on_mobile.svg": "/images/icons/location_on.svg"
      }
    })
    imageSeries.data = data
    // Add data for the three cities
    // imageSeries.data = [{
    //   "latitude": 48.856614,
    //   "longitude": 2.352222,
    //   "title": "Paris"
    // }, {
    //   "latitude": 40.712775,
    //   "longitude": -74.005973,
    //   "title": "New York"
    // }, {
    //   "latitude": 49.282729,
    //   "longitude": -123.120738,
    //   "title": "Vancouver"
    // }];
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon data (country shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = chart.colors.getIndex(0);

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: isMobile?"328px":"500px" }}>
  </div>;
};

export default MapChartComponent;
