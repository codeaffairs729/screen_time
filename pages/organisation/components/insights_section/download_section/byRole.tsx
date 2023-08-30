import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import PieGraph from "components/UI/PieGraph";
import { useContext } from "react";
import { ResponsiveContainer } from "recharts";
import Table from "../../table";
import { DownloadMetricVMContext } from "./download_metric.vm";
import PieChartComponent from "./pie_component";
const PIE_HEADER = ["name", "value"];
const ByRole = ({ isMobile }: { isMobile: any }) => {
    const { downloadMetrics, error, isFetchingDownloadMetrics } = useContext(
        DownloadMetricVMContext
    );

    const { downloadByRole = [] } = downloadMetrics || {};

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
    const chartData = downloadByRole.map((data: any) => ({
        category: data.name,
        value: data.value
    }))
    const pieData = downloadByRole.map((data: any) => [
        data.name,
        data.value,
    ]);

    return (
        <div>
            <div className="text-sm sm:block text-[#727272] my-4">
                <div className="sm:my-8 text-sm text-[#727272] text-center ">
                    Dataset downloads aggregated on the basis of user roles for the
                    whole organisation.
                </div>
            </div>
            <div className=" sm:ml-[25%] w-full">
                <div className=" block overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <PieChartComponent chartData={chartData} isMobile={isMobile} />
                </div>
            </div>
            <div className=" items-center flex justify-center">
                <Table
                    tableHeaders={PIE_HEADER}
                    tableData={pieData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                    tableClass=" text-sm border-white w-full sm:w-1/3 !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                    cellPadding={20}
                    showDots={false}
                    tableRow="sm:text-[17px] text-black font-normal w-full py-2 sm:!py-4  sm:!px-10 !px-4 w-full border-2 border-white"
                />
            </div>
        </div>
    );
};
export default ByRole;
