import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function BarChart({ data, titles, isMobile }: { data: any, titles: any, isMobile: boolean }) {
    useEffect(() => {
        // Create chart instance
        const chart = am4core.create("chartDiv", am4charts.XYChart);

        // Transform data to a format compatible with the chart
        const chartData = data?.map((item: any) => {
            const star = Object.keys(item)[0];
            return { category: star, value: item[star] };
        });
        
        // Add data
        chart.data = chartData;

        // Create axes
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.title.text = titles.xAxis;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = titles.yAxis;

        // Create series
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
        series.name = "Values";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fill = am4core.color("#007BFF");

        // Dispose the chart when the component is unmounted
        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="chartDiv" style={{ width: "100%", height: (isMobile?"200px":"400px") }}></div>;
}

export default BarChart;
