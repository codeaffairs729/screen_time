import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const ByTime = ({ data }: { data: any }) => {
    const mapData = (data: any) => {
        let transformedData: any = [];
        const years = Object.keys(data);

        years.forEach((year, idxy) => {
            // year
            // data[year]  = {'08' : 1}
            const yearData = data[year];
            const months = Object.keys(yearData);

            months.forEach((month, idxm) => {
                let md: any = {};
                md["name"] = month;
                md[year] = yearData[month];
                transformedData.push(md);
            });
        });

        return transformedData;
    };

    return (
        <div>
            <div className="text-xs font-light text-gray-500">
                The graph below displays the number of downloads across months
                and years.
            </div>
            <div className="flex p-1 mx-auto mt-10 md:w-1/2">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={mapData(data)}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey={2022}
                            fill="#6E72FC"
                            label={{ position: "top" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ByTime;
