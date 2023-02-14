import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import PieGraph from "components/UI/PieGraph";
import { useContext } from "react";
import { ResponsiveContainer } from "recharts";
import Table from "../../table";
import { DownloadMetricVMContext } from "./download_metric.vm";
const PIE_HEADER = ["name", "value"];
const ByUsecase = () => {
    const { downloadMetrics, error, isFetchingDownloadMetrics } = useContext(
        DownloadMetricVMContext
    );

    const { downloadByUseCase = [] } = downloadMetrics || {};

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

    const pieData = downloadByUseCase.map((data: any) => [
        data.name,
        data.value,
    ]);

    return (
        <div>
            <div className="ml-16 my-4 text-base text-dtech-dark-grey">
                Dataset downloads aggregated on the basis of user roles for the
                whole organisation.
            </div>
            <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <ResponsiveContainer width="90%" height={700}>
                    <PieGraph data={downloadByUseCase} />
                </ResponsiveContainer>
                <Table
                    tableHeaders={PIE_HEADER}
                    tableData={pieData}
                    headerClass="text-[17px] font-medium bg-[#F5F5F5] "
                    tableClass="w-[90%] text-sm text-left border table-fixed ml-12"
                    cellPadding={20}
                    tableRow="text-[17px] font-normal "
                />
            </div>
        </div>
    );
};
export default ByUsecase;
