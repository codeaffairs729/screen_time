import {
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const LineGraph = ({ width, height, data, datakeyX, datakeyY, className,hideX}: any) => {
    return (
            <LineChart
                width={width}
                height={height}
                data={data}
                className={className}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={datakeyX} tick={false} axisLine={hideX}>
                    <Label values="" />
                </XAxis>
                <YAxis tick={false} axisLine={false}>
                    <Label values="" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={datakeyY}
                    stroke="#3F0068"
                    dot={{ stroke: '#3F0068', strokeWidth: 3, r: 4, strokeDasharray:''}}
                    activeDot={{ r: 10 }}
                    strokeWidth={2}
                    isAnimationActive={false}
                />
            </LineChart>
    );
};
export default LineGraph;
