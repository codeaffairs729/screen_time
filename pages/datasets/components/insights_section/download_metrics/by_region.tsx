import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { DownloadMetricsVMContext } from "./download_metric.vm";
const WorldMap = dynamic(() => import("components/UI/world_map"), {
    ssr: false,
});
const ByRegion = () => {
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

    if (!regions?.length) {
        //Print no data to show
    }

    const loc: any = [];
    const downloadCounts: any = [];
    regions?.map((region: any) => {
        region["location"]?.map((location: any) => {
            loc.push([location?.lat, location?.long]);
            downloadCounts.push(1);
        });
    });
    return (
        <div className="w-[90%]">
            <WorldMap locations={loc} counts={downloadCounts} />
        </div>
    );
};
export default ByRegion;
