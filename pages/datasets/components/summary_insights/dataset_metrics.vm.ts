import { useEffect } from "react";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";

export interface MetricsData {
    dataset_id: number;
    downloads_by_time: any;
    downloads_by_location: any;
    downloads_by_role: any;
    views_by_time: any;
    views_by_location: any;
    views_by_role: any;
}

const DatasetMetricsVM = (
    setMetricsData: (arg0: MetricsData) => void,
    datasetID: number | undefined
) => {
    useEffect(() => {
        fetchDatasetMetrics();
    }, []);

    // use the API for getting the dataset metrics.
    const { execute: executePageLoad, isLoading: isPageLoading } =
        useHttpCall();
    const fetchDatasetMetrics = () => {
        executePageLoad(
            () =>
                Http.get(`/v1/dataset-metrics/dataset?dataset_id=${datasetID}`),
            {
                onSuccess: (res) => {
                    setMetricsData(res);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while fetching metrics data."
                    ),
            }
        );
    };

    return { isPageLoading };
};

export default DatasetMetricsVM;
