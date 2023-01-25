import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";

const DatasetQualityInsightsBody = () => {
    const { selectedQualityInsights: selectedLabel } = useContext(
        DatasetDetailVMContext
    );

    return (
        <div className="flex justify-center items-end mt-20">

            {selectedLabel == 0 && <div>DatasetQuality  data</div>}
            {selectedLabel == 1 && <div>DatasetQuality meta</div>}
        </div>
    );
};
export default DatasetQualityInsightsBody;
