import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import dynamic from "next/dynamic";
import { getAge } from "pages/workspace/notification.vm";
import { useContext } from "react";
import Table from "../../table";
import { DownloadMetricVMContext } from "./download_metric.vm";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const TABLE_HEADERS = ["Region", "Count", "Last used"];
const ByRegion = () => {
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
        <div>
            <div className="my-4 ml-16 text-base text-dtech-dark-grey">
                Dataset downloads aggregated on the basis of locations for the
                whole organisation.
            </div>
            <div className="mt-12 ml-8 mr-24 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <WorldMap locations={loc} counts={downloadCounts} />
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
        </div>
    );
};
export default ByRegion;
