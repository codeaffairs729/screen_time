import PieGraph from "components/UI/PieGraph";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { useContext } from "react";

const ByRole = () => {
    const { downloadMetrics } = useContext(DatasetDetailVMContext);

    const { downloadByUseCase = [] } = downloadMetrics || {};
    
    return (
        <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <PieGraph data={downloadByUseCase} />
        </div>
    );
};
export default ByRole;
