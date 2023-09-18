import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import PieGraph from "components/UI/PieGraph";
import { useContext, useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import { UseCaseMetricsVMContext } from "./usecase_metric.vm";
// import PieChartComponent from "pages/organisation/components/insights_section/download_section/pie_component";
import { PIE_HEADER, sortAndAggregate } from "pages/organisation/components/insights_section/use_case_section/section";
import dynamic from "next/dynamic";
import Table from "pages/organisation/components/table";
const PieChartComponent = dynamic(() => import("pages/organisation/components/insights_section/download_section/pie_component"), {
    ssr: false,
});
const DatasetUseCasesBody = () => {
    const [isMobile, setIsMobile] = useState(false)
    const {
        error,
        useCaseMetrics = [],
        isFetchingUseCaseMetrics,
        fetchUseCaseMetrics,
    } = useContext(UseCaseMetricsVMContext);

    useEffect(() => {
        fetchUseCaseMetrics && fetchUseCaseMetrics();
    }, []);
    const useCases = useCaseMetrics?.map((item:any) =>( {
        category: item.name,
        value:item.value
    }))
    const pieData = sortAndAggregate(useCases).map((data: any) => [
        data.category.charAt(0).toUpperCase() + data.category.slice(1),
        data.value
    ]);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (isFetchingUseCaseMetrics) {
        return (
            <div className="h-full w-full flex items-center justify-center mt-24">
                <Loader />
            </div>
        );
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
        <div className="flex flex-col items-center justify-center">
            <div className=" text-center mx-10 text-[#727272] sm:text-sm text-xs my-6 sm:my-10"> The use cases for this dataset summarised in the chart below has
                been gathered through user feedback..</div>
            <div className=" sm:ml-[44%] w-full">
                <PieChartComponent isMobile={isMobile} chartData={sortAndAggregate(useCases)} />
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
)
};
export default DatasetUseCasesBody;
