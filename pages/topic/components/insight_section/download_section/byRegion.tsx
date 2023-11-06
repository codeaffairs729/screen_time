import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import dynamic from "next/dynamic";
import { getAge } from "pages/workspace/notification.vm";
import { useContext } from "react";

import { DownloadMetricVMContext } from "./download_metric.vm";

import { OrganisationDetailVMContext } from "pages/organisation/organisation_detail.vm";
import MapChartComponent from "pages/organisation/components/insights_section/download_section/map_component";
import Table from "pages/organisation/components/table";
import UpgradeAccountModal from "pages/organisation/components/upgrade_modal";
import { TopicDetailVMContext } from "pages/topic/topic_detail.vm";

const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const TABLE_HEADERS = ["Region", "Count", "Last used"];
const ByRegion = ({ isMobile }: { isMobile: boolean }) => {
    const { downloadMetrics, error, isFetchingDownloadMetrics } = useContext(
        DownloadMetricVMContext
    );
    const { permittedPermissions } = useContext(TopicDetailVMContext)


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
    if (!regions.length) {
        return <div className=" flex flex-col-reverse sm:flex-col sm:mx-40 sm:mt-8 items-center justify-center">
            <div>
                <img src="/images/no_data_logo.svg" width={250} />
            </div>
            <div className=" sm:my-10 text-[#727272] text-center text-xl sm:text-2xl">
                Oops! No data available.
            </div>
        </div>
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
            <div className=" w-full relative ">

                <div className=" w-full">
                    <MapChartComponent regions={regions} isMobile={isMobile} />
                    {/* <WorldMap locations={loc} counts={downloadCounts} /> */}
                </div>
                <div className="flex items-center justify-center w-full ">
                <Table
                    tableHeaders={TABLE_HEADERS}
                    tableData={tableData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white  !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    cellPadding={20}
                    tableRow="sm:text-[17px] text-black font-normal py-2 sm:!py-4  sm:!px-10 !px-4  border-2 border-white"
                />
            </div>
                {(!permittedPermissions.includes("topicInsights.downloadMetrics.view")) && <div className=" absolute top-0 left-0 w-full h-full">
                    <div className="h-full"><UpgradeAccountModal /></div>
                </div>}
            </div>
        </div>
    );
};
export default ByRegion;
