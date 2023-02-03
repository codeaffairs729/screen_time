import PieGraph from "components/UI/PieGraph";
import { useContext } from "react";
import Table from "../../table";
import { DownloadMetricVMContext } from "./download_metric.vm";
const PIE_HEADER = ["name", "value"];
const ByUsecase = () => {
    const { downloadMetrics } = useContext(DownloadMetricVMContext);

    const { downloadByUseCase = [] } = downloadMetrics || {};

    const pieData = downloadByUseCase.map((data: any) => [
        data.name,
        data.value,
    ]);

    return (
        <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <PieGraph data={downloadByUseCase} />
            <Table
                tableHeaders={PIE_HEADER}
                tableData={pieData}
                headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                cellPadding={20}
                tableRow="text-[17px] font-normal "
            />
        </div>
    );
};
export default ByUsecase;
