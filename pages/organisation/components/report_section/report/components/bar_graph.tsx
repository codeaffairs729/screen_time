import React, { useEffect } from "react";
import { create, color } from "@amcharts/amcharts4/core";
import {
    XYChart,
    CategoryAxis,
    ValueAxis,
    ColumnSeries,
} from "@amcharts/amcharts4/charts";

function BarChart({
    data,
    titles,
    isMobile,
    divID,
}: {
    data: any;
    titles: any;
    isMobile: boolean;
    divID: string;
}) {

    const chart = create(`${divID}`, XYChart);
    chart.showOnInit = true;
    // Transform data to a format compatible with the chart
    const chartData = data?.map((item: any) => {
        const star = Object.keys(item)[0];
        return { category: star, value: item[star] };
    });

    // Add data
    chart.data = chartData;

    // Create axes
    const categoryAxis = chart.xAxes.push(new CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.title.text = titles.xAxis;

    const valueAxis = chart.yAxes.push(new ValueAxis());
    valueAxis.title.text = titles.yAxis;

    // Create series
    const series = chart.series.push(new ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.name = "Values";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fill = color("#007BFF");

    // Dispose the chart when the component is unmounted
    //     return () => {
    //         chart.dispose();
    //     };
    // }, [data]);

    return (
        <div
            id={divID}
            style={{ width: "100%", height: isMobile ? "200px" : "400px" }}
        ></div>
    );
}

export default BarChart;
