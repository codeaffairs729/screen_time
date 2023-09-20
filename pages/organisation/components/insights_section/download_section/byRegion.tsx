import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import dynamic from "next/dynamic";
import { getAge } from "pages/workspace/notification.vm";
import { useContext } from "react";
import Table from "../../table";
import { DownloadMetricVMContext } from "./download_metric.vm";
import MapChartComponent from "./map_component";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const TABLE_HEADERS = ["Region", "Count", "Last used"];
const ByRegion = ({ isMobile }: { isMobile: boolean }) => {
    const { downloadMetrics, error, isFetchingDownloadMetrics } = useContext(
        DownloadMetricVMContext
    );

    const { regions = [] } = downloadMetrics || {};

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
        <div className=" sm:px-20 flex items-center justify-center flex-col">
            <div className="text-sm sm:block text-[#727272] my-4">
                <div className="sm:my-8 text-sm text-[#727272] text-center ">
                    Dataset downloads aggregated on the basis of locations for the
                    whole organisation.
                </div>
            </div>
            <div className=" w-full">
                <MapChartComponent regions={regions} isMobile={isMobile} />
                {/* <WorldMap locations={loc} counts={downloadCounts} /> */}
            </div>
            {/* <div className="mt-8 w-full "> */}
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={tableData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white  !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    cellPadding={20}
                    tableRow="sm:text-[17px] text-black font-normal py-2 sm:!py-4  sm:!px-10 !px-4  border-2 border-white"
                />
            {/* </div> */}
        </div>
    );
};
export default ByRegion;
