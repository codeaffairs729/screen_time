import {useEffect} from 'react'
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";
import ByRegion from "./by_region";
import ByRole from "./by_role";
import ByTime from "./by_time";

const DatasetDownloadMetricsBody = () => {
    const { selectedDownload: selectedLabel, fetchDatasetMetrics } = useContext(
        DatasetDetailVMContext
    );
useEffect(() => {
    fetchDatasetMetrics()
}, [])

    return (
        <div className=" mt-20">
            {selectedLabel == 0 && <ByRegion />}
            {selectedLabel == 1 && <ByTime />}
            {selectedLabel == 2 && <ByRole />}
        </div>
    );
};
export default DatasetDownloadMetricsBody;
