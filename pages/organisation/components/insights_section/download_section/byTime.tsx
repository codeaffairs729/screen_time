// import BarGraph from "components/UI/BarGraph";
import RangeSelector from "components/UI/range_selector";
import { useContext, useState } from "react";
import Table from "../../table";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { DownloadMetricVMContext, DownloadByTime, getDateRange } from "./download_metric.vm";
const LineGraph = dynamic(() => import("components/UI/line_graph"), {
    ssr: false,
});
const TIME_HEADERS = ["Count", "Month"];
const barDataKey = "download_per_month";

const ByTime = () => {
    const { downloadMetrics, fromDate, toDate, setFromDate, setToDate } =
        useContext(DownloadMetricVMContext);

    const { downloadByTime = [] } = downloadMetrics || {};

    
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

    return (
        <div className="mt-12 w-full">
            <div className="flex ml-16">
                Please select your time frame:
                <RangeSelector
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div className="mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <LineGraph
                    data={lineChartData}
                    height={500}
                    width={1025}
                    datakeyX={"date"}
                    datakeyY="download"
                    className=""
                />
                {/* <BarGraph
                    data={timeMetrics}
                    strokeWidthAxis={0.4}
                    strokeWidthLabelList={0}
                    xLabel="month"
                    showIntervalLabelX={true}
                    barDatakey={barDataKey}
                    labelListDatakey={barDataKey}
                    hideY={false}
                    height={500}
                    width={1025}
                    XleftPadding={30}
                    XrightPadding={50}
                    barColor={"#F0E2FA"}
                    cellStrokeWidth={0}
                    labelListColor={"#3F0068"}
                    barSize={100}
                    labelListPosition="insideTop"
                    labellistTopPadding={6}
                    className={"ml-[-10px]"}
                /> */}
                <div className="mt-8">
                    <Table
                        tableHeaders={TIME_HEADERS}
                        tableData={tableDataByTime}
                        headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                        tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                        cellPadding={20}
                        tableRow="text-[17px] font-normal "
                    />
                </div>
            </div>
        </div>
    );
};
export default ByTime;
