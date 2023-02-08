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
        <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <ResponsiveContainer width="90%" height={700}>
                <PieGraph data={useCaseMetrics} />
            </ResponsiveContainer>
        </div>
    );
};
export default DatasetUseCasesBody;
