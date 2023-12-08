import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PieChartComponent = ({ chartData, isMobile, divID }: { chartData: any; isMobile: any; divID: string }) => {
    useEffect(() => {
        // Create chart instance
        let chart = am4core.create(`${divID}`, am4charts.PieChart);
        chart.hiddenState.properties.radius = am4core.percent(0);

        // Add data
        chart.data = chartData;

        // Create pie series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        pieSeries.radius = am4core.percent(!isMobile ? 80 : 115);

        // Disable unnecessary features for better performance
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.fontSize = isMobile ? 8 : 10;
        pieSeries.labels.template.radius = am4core.percent(isMobile ? -20 : -8);

        // Clean up on unmount
        return () => {
            chart.dispose();
        };
    }, [chartData, isMobile, divID]);

    return <div id={divID} style={{ width: isMobile ? "100%" : "70%", height: isMobile ? "400px" : "500px" }}></div>;
};

export default PieChartComponent;