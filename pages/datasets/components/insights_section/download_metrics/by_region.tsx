import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { DownloadMetricsVMContext } from "./download_metric.vm";
import { getAge } from "pages/workspace/notification.vm";
import Table from "pages/organisation/components/table";
// import MapChartComponent from "pages/organisation/components/insights_section/download_section/map_component";
const MapChartComponent = dynamic(() => import("pages/organisation/components/insights_section/download_section/map_component"), {
    ssr: false,
});
const TABLE_HEADERS = ["Region", "Count", "Last used"];
const ByRegion = ({ isMobile }: {isMobile:boolean}) => {
    const { error, downloadMetrics, isFetchingDatasetMetrics } = useContext(
        DownloadMetricsVMContext
    );
    const { regions = [] } = downloadMetrics || {};

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

    const loc: any = [];
    const downloadCounts: any = [];
    regions?.map((region: any) => {
        region["location"]?.map((location: any) => {
            loc.push([location?.lat, location?.long]);
            downloadCounts.push(1);
        });
    });
    const tableData = regions.map((region: any) => [
        region?.name,
        region?.count,
        getAge(region.date),
    ]);

    return (
        <div className="">
            <div className="text-center my-2 text-sm text-[#727272]">
                Dataset downloads aggregated on the basis of locations.
            </div>
            <div className=" flex flex-col items-center justify-center mx-8 sm:mx-0">
                <MapChartComponent regions={regions} isMobile={isMobile} />
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={tableData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white  !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    cellPadding={20}
                    tableRow="sm:text-[17px] text-black font-normal py-2 sm:!py-4  sm:!px-10 !px-4  border-2 border-white"
                />
            </div>
        </div>
    );
};
export default ByRegion;
