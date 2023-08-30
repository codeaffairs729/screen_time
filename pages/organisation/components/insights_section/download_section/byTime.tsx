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
import RangeSelector from "components/UI/range_selector";
import GraphSection from "../quality_insights/graph_section";
import BarChart from "../quality_insights/bar_graph";
import Table from "../../table";
const LineGraph = dynamic(() => import("components/UI/line_graph"), {
    ssr: false,
});
const TIME_HEADERS = ["Month", "Count"];
const barDataKey = "download_per_month";

const ByTime = ({ isMobile }: { isMobile:any }) => {
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
    const graphData = [];
    let dataAvailable = false;

    for (const item of lineChartData) {
        const dataPoint = {
            [item.month ?? item.date]: item.download
        };

        graphData.push(dataPoint);

        if (item.download > 0) {
            dataAvailable = true;
        }
    }

    const titles = {
        yAxis: "Downloads",
        xAxis: "Months"
    }
    const tableData = getTableData(fromDate, toDate, dates);
    return (
        <div>
            <div className="text-sm  sm:block text-[#727272] my-4">
                <div className="sm:my-8 text-sm text-[#727272] text-center ">
                    Dataset downloads aggregated on the basis of time for the whole
                    organisation.
                </div>
            </div>
            <div className=" w-full flex flex-col items-center sm:items-start sm:flex-row sm:px-20">
                <div className="sm:w-[25%] w-[60%]">
                    <RangeSelector
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        toDate={toDate}
                        setToDate={setToDate}
                    />
                </div>
                <div className="flex flex-col items-center justify-center my-5 sm:w-2/3 sm:mx-10 ">
                    {!dataAvailable ?
                        <div className=" flex flex-col-reverse sm:flex-col sm:mx-40 sm:mt-8">
                            <img src="/images/no_data_logo.svg" width={250} />
                            <div className=" sm:my-10 text-[#727272] text-center text-xl sm:text-2xl">
                                Oops! No data available.
                            </div>
                        </div>
                        :
                        <div>
                            <BarChart data={graphData} isMobile={isMobile} titles={ titles} />
                            <div className="mt-8 ">
                                <Table
                                    tableHeaders={TIME_HEADERS}
                                    tableData={tableData}
                                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white  sm:!px-10 !px-4  text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                                    tableClass=" text-sm border-white w-full sm:min-w-[600px] !h-[300px] !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                                    cellPadding={40}
                                    showDots={false}
                                    tableRow="sm:text-[17px] text-black font-normal py-2 sm:!py-4  sm:!px-10 !px-4  border-2 border-white"
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default ByTime;
