import React, { useEffect, useRef } from "react";

const MapChartComponent = ({ regions, isMobile }: { regions: any, isMobile: boolean }) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const initializeMap = async () => {
      // Dynamically import the required modules
      const [am4core, am4maps, am4geodata_worldLow] = await Promise.all([
        import("@amcharts/amcharts4/core"),
        import("@amcharts/amcharts4/maps"),
        import("@amcharts/amcharts4-geodata/worldLow"),
      ]);

      // Create map instance
      const chart = am4core.create("mapDiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow.default;
      chart.interpolationDuration = 0;
      // Set projection
      chart.projection = new am4maps.projections.Mercator();

      // Create map polygon series
      const polygonSeries = new am4maps.MapPolygonSeries();
      chart.zoomControl = new am4maps.ZoomControl();

      // Apply hover effect to the zoom-in button
      chart.zoomControl.plusButton.adapter.add("fill", (fill, target) => {
        if (target.isHover) {
          return am4core.color("#008800"); // Change color on hover
        }
        return fill;
      });
      chart.series.push(polygonSeries);
      // Exclude Antarctica
      const imageSeries = chart.series.push(new am4maps.MapImageSeries());

      // Create a circle image in image series template so it gets replicated to all new images
      const imageSeriesTemplate = imageSeries.mapImages.template;
      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";
      const marker = imageSeriesTemplate.createChild(am4core.Circle);
      marker.fill = am4core.color("#kkkkkk");
      marker.stroke = am4core.color("#FFFFFF");
      marker.radius = isMobile ? 10 : 8;
      marker.strokeWidth = 2;
      marker.tooltipText = "{title}";

      // Set property fields
      const data = regions?.map((item: any, index: number) => {
        return {
          latitude: item.location[0].lat,
          longitude: item.location[0].long,
          title: item.count,
        };
      });
      imageSeries.data = data;
      polygonSeries.exclude = ["AQ"];

      // Make map load polygon data (country shapes and names) from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = chart.colors.getIndex(0);

      mapRef.current = chart;
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.dispose();
        mapRef.current = null;
      }
    };
  }, [regions, isMobile]);

  return <div id="mapDiv" style={{ width: "100%", height: isMobile ? "328px" : "500px" }} />;
};

export default MapChartComponent;