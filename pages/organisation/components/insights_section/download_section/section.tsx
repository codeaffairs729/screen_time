import { useContext, useEffect } from "react";
import Loader from "components/UI/loader";
import ByRegion from "./byRegion";
import ByTime from "./byTime";
import ByUsecase from "./byUsecase";
import { DownloadMetricVMContext } from "./download_metric.vm";

const DownloadSection = () => {
    const { selectedDownload: selectedLabel, fetchDownloadMetrics } =
        useContext(DownloadMetricVMContext);

    useEffect(() => {
        fetchDownloadMetrics();
    }, []);

    return (
        <div>
            {selectedLabel == 0 && <ByRegion />}
            {selectedLabel == 1 && <ByTime />}
            {selectedLabel == 2 && <ByUsecase />}
        </div>
    );
};

export default DownloadSection;
