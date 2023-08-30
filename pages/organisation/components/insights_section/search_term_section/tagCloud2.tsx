import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud';

const TagCloud2 = ({ data }:{data:any}) => {
    useEffect(() => {
        // Create a chart instance
        const chart = am4core.create('tagCloudChart', am4plugins_wordCloud.WordCloud);

        // Set up data
        chart.data = data;

        // Set up series
        const series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.dataFields.word = 'tag';
        series.dataFields.value = 'count';

        // Set up appearance
        series.colors = new am4core.ColorSet();
        series.colors.passOptions = {};
        series.heatRules.push({
            target: series.labels.template,
            property: 'fill',
            min: am4core.color('#0000CC'),
            max: am4core.color('#CC0000'),
            minValue: 0,
            maxValue: 100
        });

        // Set up other properties
        series.minFontSize = 10;
        series.maxFontSize = 70;

        return () => {
            chart.dispose();
        };
    }, [data]);
    return (
        <div id="tagCloudChart" style={{ width: '100%', height: '400px' }}></div>
    );
};

export default TagCloud2;
