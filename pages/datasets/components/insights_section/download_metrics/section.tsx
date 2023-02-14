import { useEffect } from "react";
import { useContext } from "react";
import ByRegion from "./by_region";
import ByRole from "./by_role";
import ByTime from "./by_time";
import { DownloadMetricsVMContext } from "./download_metric.vm";

const DatasetDownloadMetricsBody = () => {
    const { selectedDownload: selectedLabel, fetchDatasetMetrics } = useContext(
        DownloadMetricsVMContext
    );
    useEffect(() => {
        fetchDatasetMetrics();
    }, []);

    return (
        <div className=" mt-10">
            {selectedLabel == 0 && <ByRegion />}
            {selectedLabel == 1 && <ByTime />}
            {selectedLabel == 2 && <ByRole />}
        </div>
    );
};
export default DatasetDownloadMetricsBody;
