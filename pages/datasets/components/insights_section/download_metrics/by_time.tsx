// import BarGraph from "components/UI/BarGraph";
import LineGraph from "components/UI/line_graph";
import RangeSelector from "components/UI/range_selector";
import { useContext } from "react";
import { format } from "date-fns";
import {
    DownloadMetricsVMContext,
    DownloadByTimeEnum,
} from "./download_metric.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";

const ByTime = () => {
    const {
        error,
        isFetchingDatasetMetrics,
        isFetchingDatasetMetricsByTime,
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        downloadMetrics,
    } = useContext(DownloadMetricsVMContext);
    const { downloadByTime = [] } = downloadMetrics || {};

    if (isFetchingDatasetMetrics || isFetchingDatasetMetricsByTime) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        );
    }
    if (error) {
        return (
            <ErrorAlert
                className="m-12"
                message="Something went wrong while fetching download metrics data. Please try again later"
            />
        );
    }
    const timeMetrics = downloadByTime.map((data: DownloadByTimeEnum) => ({
        month: new Date(data?.date).toLocaleString("en", {
            month: "short",
            year: "numeric",
        }),
        download: data.count,
    }));

    let startDate = fromDate;
    let endDate = toDate;

    const getdatebetween = (startDate: any, endDate: any) => {
        let dates = [];
        let currentDate = new Date(startDate);
        let i = 0;
        while (currentDate <= new Date(endDate)) {
            let downloadTime = new Date(downloadByTime[i]?.date);
            if (downloadTime.getTime() === currentDate.getTime()) {
                dates.push({
                    date: format(currentDate, "yyyy-MM-dd"),
                    count: downloadByTime[i]?.count,
                });
                currentDate.setDate(currentDate.getDate() + 1);
                i++;
            } else {
                dates.push({
                    date: format(currentDate, "yyyy-MM-dd"),
                    count: 0,
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
        return dates;
    };
    const lineMatrics = getdatebetween(startDate, endDate).map((data) => ({
        weekDay: new Date(data?.date).toLocaleString("en", {
            weekday: "long",
            month: "short",
            year: "numeric",
        }),
        download: data.count,
    }));
    const differenceInDays: number =
        (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
    return (
        <div>
            <div className="flex flex-row mx-20">
                <span>Please select your time frame:</span>
                <RangeSelector
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                />
            </div>
            <div className="mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <LineGraph
                    data={differenceInDays > 90 ? timeMetrics : lineMatrics}
                    height={500}
                    width={1025}
                    datakeyX={differenceInDays > 90 ? "month" : "weekDay"}
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
            </div>
        </div>
    );
};
export default ByTime;
