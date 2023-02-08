import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
    "#ED95DA",
    "#7F6094",
    "#6E8DDE",
    "#09c6f9",
    "#6E72FC",
    "#CB2020",
    "#ED95DA",
    "#7F6094",
    "#6E8DDE",
];
const renderLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    payload,
    percent,
    value,
}: any) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 40) * cos;
    const my = cy + (outerRadius + 50) * sin;
    const ex = mx + 10 + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={"#302D2D"}
                strokeWidth={3}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={"#302D2D"} stroke="none" />
            <rect
                fill={fill}
                stroke={"black"}
                strokeWidth="1"
                height="90"
                width="150"
                x={ex + (cos >= 0 ? 0 : -12.6) * 12}
                y={ey + (sin >= 0 ? -5 : -6) * 5}
            />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                className="text-medium"
            >{`${payload.name}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                className="text-medium"
            >{`${value}`}</text>

            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={40}
                textAnchor={textAnchor}
                className="text-medium"
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    );
};
const PieGraph = ({
    data,
    width = 950,
    height = 700,
    radius = "60%",
    dataKey = "value",
    isAnimationActive = true,
}: {
    data: Array<Object>;
    width?: number;
    height?: number;
    radius?: string;
    dataKey?: string;
    isAnimationActive?: boolean;
}) => {
    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                dataKey={dataKey}
                nameKey="name"
                fill="#302D2D"
                labelLine={true}
                legendType="square"
                label={renderLabel}
                outerRadius={radius}
                isAnimationActive={isAnimationActive}
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
        </PieChart>
    );
};
export default PieGraph;
