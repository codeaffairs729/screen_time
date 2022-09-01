import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const COLORS = [
    "#b4b6fd",
    "#8286fc",
    "#5055fb",
    "#1e24fa",
    "#050be1",
    "#0408af",
    "#03067d",
    "#02044b",
    "#010119",
];

const ByRole = ({ data }: { data: any }) => {
    const mapData = (data: any): any[] => {
        let transformedData: any = [];
        const roles = Object.keys(data);

        roles.forEach((role, idx) => {
            let rd: any = {};
            rd["name"] = role;
            rd["value"] = data[role];
            transformedData.push(rd);
        });

        return transformedData;
    };

    return (
        <div>
            <div className="text-xs font-light text-gray-500">
                The graph below displays the number of downloads based on the
                user-type or user-role.
            </div>
            <div className="flex p-1 mx-auto mt-10 md:w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={mapData(data)}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                            legendType="circle"
                        >
                            {mapData(data).map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ByRole;
