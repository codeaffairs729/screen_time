import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PieChartComponent = ({ chartData, isMobile,divID }: { chartData: any, isMobile: any;divID:string }) => {
    useEffect(() => {
        // Create chart instance
        let chart = am4core.create(`${divID}`, am4charts.PieChart);
        chart.showOnInit = true;
        // Add data
        chart.data = chartData;

        // Create pie series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        pieSeries.radius = am4core.percent(!isMobile?80:115); // Adjust the percentage as needed

        pieSeries.ticks.template.disabled = true
        pieSeries.labels.template.fontSize = isMobile ? 8 : 10
        pieSeries.labels.template.radius = am4core.percent(isMobile ?-20:-8); // You can adjust the percentage value here

        // Animate the chart
        chart.hiddenState.properties.radius = am4core.percent(0);
        pieSeries.hiddenState.properties.endAngle = -90;
        chart.legend = new am4charts.Legend();
        chart.legend.fontSize = 12; // You can adjust the font size value here
        chart.legend.position = isMobile ? "bottom" : "right";
        chart.legend.valueLabels.template.text = "{value.percent.formatNumber('#.0')}%";
        chart.legend.useDefaultMarker = true;

        // Clean up on unmount
        return () => {
            chart.dispose();
        };
    }, []);

    return <div id={divID} style={{ width: isMobile?"100%":"70%", height: isMobile?"400px":"500px" }}></div>;
};

export default PieChartComponent;
