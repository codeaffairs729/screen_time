import { useContext, useEffect } from "react";
import Loader from "components/UI/loader";
import ByRegion from "./byRegion";
import ByTime from "./byTime";
import ByUsecase from "./byUsecase";
import { DownloadMetricVMContext } from "./download_metric.vm";

const DownloadSection = () => {
    const {
        selectedDownload: selectedLabel,
        fetchDownloadMetrics,
        isFetchingDownloadMetrics,
    } = useContext(DownloadMetricVMContext);

    useEffect(() => {
        fetchDownloadMetrics();
    }, []);

    return (
        <>
            {!isFetchingDownloadMetrics ? (
                <div>
                    {selectedLabel == 0 && <ByRegion />}
                    {selectedLabel == 1 && <ByTime />}
                    {selectedLabel == 2 && <ByUsecase />}
                </div>
            ) : (
                <div className="h-[calc(100vh-var(--nav-height))]  w-full flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default DownloadSection;
