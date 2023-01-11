import { useState } from "react";
import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";
import PieGraph from "components/UI/PieGraph";
import BarGraph from "components/UI/BarGraph";
import Table from "../../table";
import { Tab } from "@headlessui/react";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});
const TIME_HEADERS = ["Count", "Month"];
const TIME = [
    { month: "Jan", download_per_month: 265 },
    { month: "Feb", download_per_month: 475 },
    { month: "Mar", download_per_month: 190 },
    { month: "Apr", download_per_month: 465 },
    { month: "May", download_per_month: 565 },
    { month: "Jun", download_per_month: 465 },
    { month: "Jul", download_per_month: 85 },
    { month: "Aug", download_per_month: 195 },
    { month: "Sep", download_per_month: 1225 },
    { month: "Oct", download_per_month: 165 },
    { month: "Nov", download_per_month: 365 },
    { month: "Des", download_per_month: 265 },
];
const timeData = TIME.map((data, index) => [
    index,
    [data.download_per_month],
    [data.month + " " + "2022"],
]);
const PIE_HEADER = ["name", "value"];
const PIEDATA = [
    { name: "Data modelling", value: 400 },
    { name: "Publications", value: 300 },
    { name: "Planning", value: 200 },
    { name: "gov", value: 500 },
    { name: "Plan", value: 300 },
];
const PieData = PIEDATA.map((data, index) => [[data.name], [data.value]]);
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
                    tableHeaders={PIE_HEADER}
                    tableData={PieData}
                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                    tableClass="w-[50%]"
                    cellPadding={20}
                    tableRow="text-[17px] "
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
                <Table
                    tableHeaders={TIME_HEADERS}
                    tableData={timeData}
                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                    tableClass="w-[50%]"
                    cellPadding={20}
                    tableRow="text-[17px]"
                />
            </div>
            <Tab.Group>
                <Tab.List>
                    <Head />
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <Preview />
                    </Tab.Panel>
                    <Tab.Panel>
                        <EditReport />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            {/* <Head edit={edit} setEdit={setEdit} />
            {edit ? <EditReport /> : <Preview />} */}
        </div>
    );
};

export default Report;
