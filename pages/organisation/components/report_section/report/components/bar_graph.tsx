import { create, color } from "@amcharts/amcharts4/core";
import {
    XYChart,
    CategoryAxis,
    ValueAxis,
    ColumnSeries,
} from "@amcharts/amcharts4/charts";
import { useEffect, useRef } from "react";

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
    const chartRef = useRef<XYChart | null>(null);

    useEffect(() => {
        // Create chart if it doesn't exist
        if (!chartRef.current) {
            chartRef.current = create(`${divID}`, XYChart);
            chartRef.current.showOnInit = true;
            // chartRef.current.animated = false;
            
            const categoryAxis = chartRef.current.xAxes.push(new CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.title.text = titles.xAxis;

            const valueAxis = chartRef.current.yAxes.push(new ValueAxis());
            valueAxis.title.text = titles.yAxis;

            const series = chartRef.current.series.push(new ColumnSeries());
            // console.log("bargraph is ",series)
            series.dataFields.valueY = "value";
            series.dataFields.categoryX = "category";
            series.name = "Values";
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fill = color("#007BFF");
            // series.animated = false;
        }

        // Update data
        // console.log("data is ",data)
        // const chartData = data?.map((item: any) => {
        //     console.log("checking ****************",item)
        //     const star = Object.keys(item)[0];
        //     console.log("star is ",star)
        //     return { category: star, value: item[star] };
        // });
        // console.log("chartData is ",chartData)

        // chartRef.current.data = chartData;

        const chartData = data?.map((item: any) => ({
            category: Object.keys(item)[0],
            value: item[Object.keys(item)[0]],
        }));

        if (chartData) {
            chartRef.current.data = chartData;
        }

        // Dispose the chart when the component is unmounted
        // return () => {
        //     if (chartRef.current) {
        //         chartRef.current.dispose();
        //         chartRef.current = null;
        //     }
        // };
    }, [data, titles, divID]);

    return (
        <div
            id={divID}
            style={{ width: "100%", height: isMobile ? "200px" : "400px" }}
        >
             {console.log("current is",chartRef)}
        </div>
    );
}

export default BarChart;