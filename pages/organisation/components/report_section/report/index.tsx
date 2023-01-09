import { useState } from "react";
import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";
import PieGraph from "components/UI/PieGraph";
import BarGraph from "components/UI/BarGraph";
import Table from "../../table";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});

const Report = () => {
    const [edit, setEdit] = useState(false);
    return (
        <div>
            <div
                id="screenshot"
                className="flex absolute justify-center flex-col  z-[-10]"
            >
                <BarGraph
                    data={[
                        { name: 1, rating: 10 },
                        { name: 2, rating: 30 },
                        { name: 3, rating: 20 },
                        { name: 4, rating: 40 },
                        { name: 5, rating: 10 },
                    ]}
                    width={400}
                    height={200}
                    strokeWidthAxis={2}
                    strokeWidthLabelList={0}
                    className="font-medium my-2"
                    XleftPadding={20}
                    XrightPadding={30}
                    xLabel=""
                    yLabel=""
                    xvalue=""
                    yvalue=""
                    barDatakey={"rating"}
                    labelListDatakey={"name"}
                    isAnimationActive={false}
                />
                <Table
                    tableHeaders={["I column", "II column"]}
                    tableData={[
                        [0, 2, 3],
                        [1, 3, 2],
                        [2, 4, 5],
                    ]}
                    cellPadding={3}
                    tableClass="ml-20"
                />
            </div>
            <div
                id="pie"
                className="flex absolute justify-center flex-col  z-[-10]"
            >
                <PieGraph
                    data={[
                        { name: "Data modelling", value: 400 },
                        { name: "Publications", value: 300 },
                        { name: "Planning", value: 200 },
                    ]}
                    isAnimationActive={false}
                    radius="60%"
                />
            </div>
            <Head edit={edit} setEdit={setEdit} />
            {edit ? <EditReport /> : <Preview />}
        </div>
    );
};

export default Report;
