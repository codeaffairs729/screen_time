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

const LineGraph = ({ width, height, data, datakeyX, datakeyY, className}: any) => {
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
                <XAxis dataKey={datakeyX} tick={false}>
                    <Label values="" />
                </XAxis>
                <YAxis tick={false}>
                    <Label values="" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={datakeyY}
                    stroke="#3F0068"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
    );
};
export default LineGraph;
