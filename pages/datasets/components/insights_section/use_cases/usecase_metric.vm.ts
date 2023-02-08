import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";

const UseCaseMetricsVM = () => {
    const { dataset } = useContext(DatasetDetailVMContext);
    const {
        execute: excuteFetchUseCaseMetrics,
        data: useCaseMetrics,
        error,
        isLoading: isFetchingUseCaseMetrics,
    } = useHttpCall<{ [key: string]: any }>([]);
    const fetchUseCaseMetrics = () =>
        excuteFetchUseCaseMetrics(
            () => {
                return Http.get(`/v1/datasets/usecase_metric/${dataset?.id}`);
            },
            {
                postProcess: (res) => jsonToUseCaseMetrics(res),
                onError: (e) => {
                    console.log(e);
                    toast.error(
                        "Something went wrong while fetching organisation Data UseCase insights."
                    );
                },
            }
        );

    return {
        error,
        useCaseMetrics,
        isFetchingUseCaseMetrics,
        fetchUseCaseMetrics,
    };
};

export default UseCaseMetricsVM;

interface IUseCaseMetricsVMContext {
    error: any;
    useCaseMetrics: any;
    isFetchingUseCaseMetrics: boolean;
    fetchUseCaseMetrics: Function;
}

export const UseCaseMetricsVMContext = createContext<IUseCaseMetricsVMContext>(
    {} as IUseCaseMetricsVMContext
);

const jsonToUseCaseMetrics = (json: any = {}) => {
    return Object.keys(json).map((key) => ({
        name: key,
        value: json[key]["count"],
    }));
};
