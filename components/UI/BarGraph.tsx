import { BarChart, XAxis, YAxis, Bar, LabelList, Cell, Label } from "recharts";

const BarGraph = ({
    data = [],
    strokeWidthAxis,
    className,
    xLabel = "",
    yLabel = "",
    showIntervalLabelY = false,
    showIntervalLabelX = false,
    strokeWidthLabelList,
    xvalue = "",
    yvalue = "",
    barDatakey = "",
    labelListDatakey = "",
    hideY = false,
    width = 450,
    height = 250,
    XleftPadding = 30,
    XrightPadding = 100,
    cellStrokeWidth = 1,
    barColor = "#F5F5F5",
    labelListColor = "#3F0068",
    barSize = 40,
    labelListPosition = "insideBottom",
    labellistTopPadding = 0,
    isAnimationActive=true,
}: {
    data?: Array<Object>;
    strokeWidthAxis?: number;
    className?: string;
    xLabel?: string;
    yLabel?: string;
    showIntervalLabelY?: boolean;
    showIntervalLabelX?: boolean;
    strokeWidthLabelList?: number;
    xvalue?: string;
    yvalue?: string;
    barDatakey?: string;
    labelListDatakey?: string;
    hideY?: boolean;
    width?: number;
    height?: number;
    XleftPadding?: number;
    XrightPadding?: number;
    cellStrokeWidth?: number;
    barColor?: string;
    labelListColor?: string;
    barSize?: number;
    labelListPosition?: any;
    labellistTopPadding?: number;
    isAnimationActive?: boolean;
}) => {
    return (
        <BarChart
            width={width}
            height={height}
            data={data}
            className={className}
        >
            <XAxis
                padding={{ left: XleftPadding, right: XrightPadding }}
                dataKey={xLabel}
                tick={showIntervalLabelX}
                stroke={"#5F5F63"}
                strokeWidth={strokeWidthAxis}
            >
                <Label
                    value={xvalue}
                    position={"left"}
                    offset={-100}
                    fill={"#5F5F63"}
                />
            </XAxis>
            <YAxis
                tick={showIntervalLabelY}
                dataKey={yLabel}
                stroke={"#5F5F63"}
                strokeWidth={strokeWidthAxis}
                hide={hideY}
            >
                <Label
                    value={yvalue}
                    angle={-90}
                    position="insideBottomLeft"
                    offset={50}
                    fill={"#5F5F63"}
                    dy={30}
                />
            </YAxis>
            <Bar dataKey={barDatakey} fill={barColor} barSize={barSize} isAnimationActive={isAnimationActive}>
                {data.map((_, index) => (
                    <Cell
                        key={`cell-${index}}`}
                        stroke={"#3F0068"}
                        strokeWidth={cellStrokeWidth}
                    />
                ))}
                <LabelList
                    dy={labellistTopPadding}
                    dataKey={labelListDatakey}
                    fill={labelListColor}
                    position={labelListPosition}
                    strokeWidth={strokeWidthLabelList}
                />
            </Bar>
        </BarChart>
    );
};
export default BarGraph;
