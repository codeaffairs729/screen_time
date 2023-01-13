import BarGraph from "components/UI/BarGraph";
// import CalendarSelect from "components/UI/calendar_select";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { useContext, useEffect, useMemo, useState } from "react";
import Loader from "components/UI/loader";
import {
    DownloadByTime,
    OrganisationDetailVMContext,
} from "pages/organisation/organisation_detail.vm";
import { getAge } from "pages/workspace/notification.vm";
import ByRegion from "./byRegion";
import ByTime from "./byTime";
import ByUsecase from "./byUsecase";

const TABLE_HEADERS = ["Region", "Count", "Last used"];
const PIE_HEADER = ["name", "value"];
const TIME_HEADERS = ["Count", "Month"];

const DownloadSection = () => {
    const {
        selectedDownload: selectedLabel,
        isLoading,
        downloadMetrics,
        fetchDownloadMetrics,
    } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fetchDownloadMetrics();
    }, []);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const {
        downloadByTime = [],
        regions = [],
        downloadByUseCase = [],
    } = downloadMetrics || {};

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

    const barDataKey = "download_per_month";

    const locations: Array<LatLngExpression> = regions.map((region: any) => [
        region?.location?.lat,
        region?.location?.long,
    ]);

    const tableData = regions.map((region: any) => [
        region?.name,
        region?.count,
        getAge(region.date),
    ]);

    const downloadCounts = regions.map((region: any) => region?.count);

    const pieData = downloadByUseCase.map((data: any, index: number) => [
        data.name,
        data.value,
    ]);

    return (
        <div>
            {selectedLabel == 0 && (
                <ByRegion
                    locations={locations}
                    downloadCounts={downloadCounts}
                    TABLE_HEADERS={TABLE_HEADERS}
                    tableData={tableData}
                />
            )}
            {selectedLabel == 1 && (
                <ByTime
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    timeMetrics={timeMetrics}
                    barDataKey={barDataKey}
                    TIME_HEADERS={TIME_HEADERS}
                    downloadByTimeData={downloadByTimeData}
                />
            )}
            {selectedLabel == 2 && (
                <ByUsecase
                    downloadByUseCase={downloadByUseCase}
                    PIE_HEADER={PIE_HEADER}
                    pieData={pieData}
                />
            )}
        </div>
    );
};

export default DownloadSection;
