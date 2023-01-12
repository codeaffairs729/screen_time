import BarGraph from "components/UI/BarGraph";
// import CalendarSelect from "components/UI/calendar_select";
import PieGraph from "components/UI/PieGraph";
import { LatLngExpression } from "leaflet";
import Table from "../../table";
import dynamic from "next/dynamic";
import RangeSelector from "components/UI/range_selector";
import { useContext, useEffect, useMemo, useState } from "react";
import Loader from "components/UI/loader";
import {
    DownloadByTime,
    OrganisationDetailVMContext,
} from "pages/organisation/organisation_detail.vm";
import { getNotificationAge } from "pages/workspace/notification.vm";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});

const TABLE_HEADERS = ["Region", "Count", "Last used"];
const PIE_HEADER = ["name", "value"];
const TIME_HEADERS = ["Count", "Month"];

const DownloadSection = () => {
    const {
        selectedDownload: selectedLabel,
        isLoading,
        downloadMetrics,
        fectchDownloadMetrics,
    } = useContext(OrganisationDetailVMContext);

    useEffect(() => {
        fectchDownloadMetrics();
    }, []);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const downloadByTimeData = downloadMetrics?.downloadByTime?.map(
        (data: DownloadByTime) => {
            const date = new Date(data?.date);
            const month = date.toLocaleString("en", { month: "short" });
            const year = new Date().getFullYear();

            return [[data.count], [`${month} ${year}`]];
        }
    );

    const timeMetrics = downloadMetrics?.downloadByTime?.map(
        (data: DownloadByTime) => ({
            month: new Date(data?.date).toLocaleString("en", {
                month: "short",
            }),
            download_per_month: data.count,
        })
    );

    const barDataKey = "download_per_month";

    const locations: Array<LatLngExpression> = downloadMetrics?.regions?.map(
        (region: any) => [region?.location?.lat, region?.location?.long]
    );

    const tableData = downloadMetrics?.regions?.map((region: any) => [
        region?.name,
        region?.count,
        getNotificationAge(region.date),
    ]);

    const downloadCounts = downloadMetrics?.regions?.map(
        (region: any) => region?.count
    );

    const pieData = downloadMetrics?.downloadByUseCase.map(
        (data: any, index: number) => [data.name, data.value]
    );

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {selectedLabel == 0 && (
                <div className="mt-12 ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <WorldMap locations={locations} counts={downloadCounts} />
                    <div className="mt-8">
                        <Table
                            tableHeaders={TABLE_HEADERS}
                            tableData={tableData}
                            headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                            tableClass="w-full text-sm text-left border table-fixed"
                            cellPadding={20}
                            tableRow="text-[17px] font-normal "
                        />
                    </div>
                </div>
            )}
            {selectedLabel == 1 && (
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
            )}
            {selectedLabel == 2 && (
                <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <PieGraph data={downloadMetrics?.use_case} />
                    <Table
                        tableHeaders={PIE_HEADER}
                        tableData={pieData}
                        headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                        tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                        cellPadding={20}
                        tableRow="text-[17px] font-normal "
                    />
                </div>
            )}
        </div>
    );
};

export default DownloadSection;
