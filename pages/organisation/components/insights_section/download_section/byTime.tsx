import BarGraph from "components/UI/BarGraph";
import RangeSelector from "components/UI/range_selector";
import {
    DownloadByTime,
    OrganisationDetailVMContext,
} from "pages/organisation/organisation_detail.vm";
import { useContext, useState } from "react";
import Table from "../../table";

const TIME_HEADERS = ["Count", "Month"];
const barDataKey = "download_per_month";

const ByTime = () => {
    const { downloadMetrics, fromDate, toDate, setFromDate, setToDate } =
        useContext(OrganisationDetailVMContext);

        const { downloadByTime = [] } = downloadMetrics || {};

        const downloadByTimeData = downloadByTime.map((data: DownloadByTime) => {
            const date = new Date(data?.date);
            const month = date.toLocaleString("en", { month: "short" });
            const year = new Date().getFullYear();

            return [[data.count], [`${month} ${year}`]];
    });

    const timeMetrics = downloadByTime.map((data: DownloadByTime) => ({
        month: new Date(data?.date).toLocaleString("en", {
            month: "short",
        }),
        download_per_month: data.count,
    }));

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
                <BarGraph
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
                />
                <div className="mt-8">
                    <Table
                        tableHeaders={TIME_HEADERS}
                        tableData={downloadByTimeData}
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
