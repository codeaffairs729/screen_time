import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import PieGraph from "components/UI/PieGraph";
import { useContext, useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import { UseCaseMetricsVMContext } from "./usecase_metric.vm";

const DatasetUseCasesBody = () => {
    const {
        error,
        useCaseMetrics = [],
        isFetchingUseCaseMetrics,
        fetchUseCaseMetrics,
    } = useContext(UseCaseMetricsVMContext);

    useEffect(() => {
        fetchUseCaseMetrics && fetchUseCaseMetrics();
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
        <div>
            <div className="ml-10 my-4 text-sm text-dtech-dark-grey">
                The use cases for this dataset summarised in the chart below has
                been gathered through user feedback.
            </div>
            <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
                <ResponsiveContainer width="90%" height={700}>
                    <PieGraph data={useCaseMetrics} />
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default DatasetUseCasesBody;
