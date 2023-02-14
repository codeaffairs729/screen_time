import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import PieGraph from "components/UI/PieGraph";
import { useContext } from "react";
import { ResponsiveContainer } from "recharts";
import { DownloadMetricsVMContext } from "./download_metric.vm";

const ByRole = () => {
    const { error, isFetchingDatasetMetrics, downloadMetrics } = useContext(
        DownloadMetricsVMContext
    );

    const { downloadByUseCase = [] } = downloadMetrics || {};

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

    return (
        <div>
            <div className="ml-16 text-sm text-dtech-dark-grey">
                Dataset downloads aggregated on the basis of user roles.
            </div>
            <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <ResponsiveContainer width="90%" height={700}>
                    <PieGraph data={downloadByUseCase} />
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default ByRole;
