import Head from "./head";
import Preview from "./preview";
import dynamic from "next/dynamic";
import PieGraph from "components/UI/PieGraph";
import Table from "../../table";
import { Tab } from "@headlessui/react";
import { useContext, useEffect, useMemo } from "react";
import {
    DownloadByTime,
    OrganisationDetailVMContext,
} from "pages/organisation/organisation_detail.vm";
import Loader from "components/UI/loader";
import { getDateRange, ReportVMContext } from "../report.vm";
import LineGraph from "components/UI/line_graph";

const EditReport = dynamic(() => import("./editReport"), {
    ssr: false,
});
const TIME_HEADERS = ["Count", "Month"];
const PIE_HEADER = ["name", "value"];

const Report = () => {
    const { downloadMetrics, fetchDownloadMetrics } = useContext(
        OrganisationDetailVMContext
    );
    const {
        loading,
        fromDate,
        toDate,
        downloadByTime = [],
        downloadByRole = [],
    } = useContext(ReportVMContext);
    useEffect(() => {
        fetchDownloadMetrics();
    }, []);
    // const { downloadByTime = [], downloadByRole = [] } = downloadMetrics || {};

    const filteredDates = useMemo(
        () =>
            downloadByTime.filter(
                (data: any) =>
                    new Date(data?.date) >= new Date(fromDate) &&
                    new Date(data?.date) <= new Date(toDate)
            ),
        [fromDate, toDate]
    );

    const tableDataByTime = useMemo(
        () =>
            filteredDates.map((data: DownloadByTime) => {
                const date = new Date(data?.date);
                const month = date.toLocaleString("en", { month: "short" });
                const year = new Date(data?.date).getFullYear();
                return [[data.count], [`${month} ${year}`]];
            }),
        [fromDate, toDate]
    );

    const lineChartData = useMemo(
        () => getDateRange(fromDate, toDate, filteredDates),
        [fromDate, toDate]
    );

    const pieData = useMemo(
        () => downloadByRole.map((data: any) => [data.name, data.value]),
        [downloadByRole]
    );

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
                <div
                    id="pie"
                    className="flex absolute justify-center items-center flex-col z-[-10]"
                >
                    {downloadByRole.length && (
                        <>
                            <PieGraph
                                data={downloadByRole}
                                isAnimationActive={false}
                                radius="60%"
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
                    )}
                </div>
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
