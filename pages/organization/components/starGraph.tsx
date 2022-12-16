import { BarChart, XAxis, YAxis, CartesianGrid, Bar,LabelList } from "recharts";

const StarGraph = ({ star }: any) => {
    return (
        <BarChart
            width={500}
            height={250}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            data={star}
            className="border "
        >
            <XAxis
                padding={{ left: 20, right: 100 }}
                label="Star Rating"
                tickLine={false}
                dataKey="rating"
                
            />
            <YAxis label="Datasets" />
            <Bar dataKey="rating" fill="#F5F5F5">
                <LabelList fill="#F5F5F5" />
            </Bar>
        </BarChart>
    );
};
export default StarGraph;
