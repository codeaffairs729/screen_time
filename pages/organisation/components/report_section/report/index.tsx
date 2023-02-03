import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";
import PieGraph from "components/UI/PieGraph";
import Table from "../../table";
import { Tab } from "@headlessui/react";
import { useContext } from "react";
import Loader from "components/UI/loader";
import { getDateRange, ReportVMContext } from "../report.vm";
import LineGraph from "components/UI/line_graph";
import { DownloadByTime } from "../../insights_section/download_section/download_metric.vm";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});
const TIME_HEADERS = ["Count", "Month"];
const PIE_HEADER = ["name", "value"];

const Report = () => {

    const {
        loading,
        fromDate,
        toDate,
        downloadByTime = [],
        downloadByRole = [],
    } = useContext(ReportVMContext);

    const filteredDates = downloadByTime.filter(
        (data: any) =>
            new Date(data?.date) >= new Date(fromDate) &&
            new Date(data?.date) <= new Date(toDate)
    );

    const tableDataByTime = filteredDates.map((data: DownloadByTime) => {
        const date = new Date(data?.date);
        const month = date.toLocaleString("en", { month: "short" });
        const year = new Date(data?.date).getFullYear();
        return [[data.count], [`${month} ${year}`]];
    });

    const lineChartData = getDateRange(fromDate, toDate, filteredDates);

    const pieData = downloadByRole.map((data: any) => [data.name, data.count]);

    return (
        <div>
            {loading && (
                <div className="flex absolute min-w-[700px] h-[656px]  mt-12 ml-1 bg-black bg-opacity-10 z-20 ">
                    <div className="ml-auto mr-auto my-auto">
                        <Loader sizeClass="h-10 w-10" />
                    </div>
                </div>
            )}
            <div className=" h-[56rem] overflow-y-scroll no-scrollbar whitespace-nowrap absolute">
                {downloadByTime.length > 0 && (
                    <div
                        id="screenshot"
                        className="flex absolute justify-center items-center flex-col z-[-10]"
                    >
                        <LineGraph
                            data={lineChartData}
                            height={500}
                            width={1025}
                            datakeyX={"date"}
                            datakeyY="download"
                            className=""
                        />
                        <Table
                            tableHeaders={TIME_HEADERS}
                            tableData={tableDataByTime}
                            headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                            tableClass="w-[90%] ml-12 text-sm text-left table-fixed"
                            cellPadding={20}
                            tableRow="text-[17px]"
                        />
                    </div>
                )}
                {downloadByRole.length > 0 && (
                    <div
                        id="pie"
                        className="flex absolute justify-center items-center flex-col z-[-10]"
                    >
                        <>
                            <PieGraph
                                data={downloadByRole}
                                isAnimationActive={false}
                                radius="60%"
                                dataKey="count"
                            />

                            <Table
                                tableHeaders={PIE_HEADER}
                                tableData={pieData}
                                headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                                tableClass="w-[80%] ml-20 text-left table-fixed"
                                cellPadding={20}
                                tableRow="text-[17px]"
                            />
                        </>
                    </div>
                )}
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
        </div>
    );
};

export default Report;
