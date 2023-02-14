// import BarGraph from "components/UI/BarGraph";
import LineGraph from "components/UI/line_graph";
import RangeSelector from "components/UI/range_selector";
import { useContext } from "react";
import { format } from "date-fns";
import {
    DownloadMetricsVMContext,
    DownloadByTimeEnum,
    getDateRange,
} from "./download_metric.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import { ResponsiveContainer } from "recharts";
import TimeSelect from "components/UI/time_select";

const ByTime = () => {
    const {
        error,
        isFetchingDatasetMetrics,
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        downloadMetrics,
    } = useContext(DownloadMetricsVMContext);
    const { downloadByTime = [] } = downloadMetrics || {};

    if (isFetchingDatasetMetrics) {
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

    return (
        <div>
            <div className="ml-16 text-sm text-dtech-dark-grey">
                Dataset downloads aggregated on the basis of time.
            </div>
            <TimeSelect
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                lineChartData={lineChartData}
                recordDetailsType="dataset"
            />
        </div>
    );
};
export default ByTime;
