import { BarChart, XAxis, YAxis, Bar, LabelList, Cell, Label } from "recharts";

const BarGraph = ({
    star = [],
    strokeWidthAxis,
    className,
    xLabel = "",
    yLabel = "",
    showIntervalLabel = false,
    strokeWidthLabelList,
    xvalue = "",
    yvalue = "",
    barDatakey = "",
    labelListDatakey = "",
}: {
    star?: Array<Object>;
    strokeWidthAxis?: number;
    className?: string;
    xLabel?: string;
    yLabel?: string;
    showIntervalLabel?: boolean;
    strokeWidthLabelList?: number;
    xvalue?: string;
    yvalue?: string;
    barDatakey?: string;
    labelListDatakey?: string;
}) => {
    return (
        <BarChart width={450} height={250} data={star} className={className}>
            <XAxis
                padding={{ left: 30, right: 100 }}
                dataKey={xLabel}
                tick={showIntervalLabel}
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
                tick={showIntervalLabel}
                dataKey={yLabel}
                stroke={"#5F5F63"}
                strokeWidth={strokeWidthAxis}
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
            <Bar dataKey={barDatakey} fill="#F5F5F5">
                {star.map((_, index) => (
                    <Cell
                        key={`cell-${index}}`}
                        stroke={"#3F0068"}
                        strokeWidth={1}
                    />
                ))}
                <LabelList
                    dataKey={labelListDatakey}
                    fill={"#3F0068"}
                    position={"insideBottom"}
                    strokeWidth={strokeWidthLabelList}
                />
            </Bar>
        </BarChart>
    );
};
export default BarGraph;
