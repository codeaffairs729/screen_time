import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import PieGraph from "components/UI/PieGraph";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { ResponsiveContainer } from "recharts";
import { DownloadMetricsVMContext } from "./download_metric.vm";
import Table from "pages/organisation/components/table";
// import PieChartComponent from "pages/organisation/components/insights_section/download_section/pie_component";
const PieChartComponent = dynamic(() => import("pages/organisation/components/insights_section/download_section/pie_component"), {
    ssr: false,
});
const PIE_HEADER = ["name", "value"];
const ByRole = ({ isMobile }: { isMobile: boolean }) => {
    const { error, isFetchingDatasetMetrics, downloadMetrics } = useContext(
        DownloadMetricsVMContext
    );

    const { downloadByRole = [] } = downloadMetrics || {};
    const chartData = downloadByRole.map((data: any) => ({
        category: data.name,
        value: data.value
    }))
    const pieData = downloadByRole.map((data: any) => [
        data.name,
        data.value,
    ]);
    if (isFetchingDatasetMetrics) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        );
    }
    if (!isFetchingDatasetMetrics && downloadByRole.length < 1) {
        return <div className=" flex flex-col-reverse sm:flex-col sm:mx-40 sm:mt-8 items-center justify-center">
            <div>
                <img src="/images/no_data_logo.svg" width={250} />
            </div>
            <div className=" sm:my-10 text-[#727272] text-center text-xl sm:text-2xl">
                Oops! No data available.
            </div>
        </div>
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
            <div className="text-center my-2 text-sm text-[#727272]">
                Dataset downloads aggregated on the basis of user roles.
            </div>
            <div className=" sm:ml-[22%] w-full">
                <div className=" block overflow-y-scroll no-scrollbar whitespace-nowrap">
                    <PieChartComponent chartData={chartData} isMobile={isMobile} />
                </div>
            </div>
            <div className=" items-center flex justify-center">
                <Table
                    tableHeaders={PIE_HEADER}
                    tableData={pieData}
                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white !w-full sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
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
