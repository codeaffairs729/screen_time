import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import {
    DownloadMetricVMContext,
    getDateRange,
    getTableData,
} from "./download_metric.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import TimeSelect from "components/UI/time_select";
const LineGraph = dynamic(() => import("components/UI/line_graph"), {
    ssr: false,
});
const TIME_HEADERS = ["Count", "Month"];
const barDataKey = "download_per_month";

const ByTime = () => {
    const {
        downloadMetrics,
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        error,
        isFetchingDownloadMetrics,
    } = useContext(DownloadMetricVMContext);

    const { downloadByTime = [] } = downloadMetrics || {};

    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching download metrics data. Please try again later"
            />
        );
    }
    if (isFetchingDownloadMetrics) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const filteredDates = downloadByTime.filter(
        (data: any) =>
            new Date(data?.date) >= new Date(fromDate) &&
            new Date(data?.date) <= new Date(toDate)
    );

    const dates = filteredDates.sort((a: any, b: any) => {
        if (new Date(a.date) > new Date(b.date)) return 1;
        if (new Date(a.date) < new Date(b.date)) return -1;
        else return 0;
    });
    const lineChartData = getDateRange(fromDate, toDate, dates);

    const tableData = getTableData(fromDate, toDate, dates);
    return (
        <div>
            <div className="ml-16 my-4 text-base text-dtech-dark-grey">
                Dataset downloads aggregated on the basis of time for the whole
                organisation.
            </div>
            <TimeSelect
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                lineChartData={lineChartData}
                TIME_HEADERS={TIME_HEADERS}
                tableDataByTime={tableData}
                recordDetailsType="organisation"
            />
        </div>
    );
};
export default ByTime;
