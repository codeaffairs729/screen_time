import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useFetchStats } from "common/utils/datasets.util";
import Dataset from "models/dataset.model.v4";
// import SearchVM, { SearchVMContext } from "pages/search/search.vm";
import { createContext } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const RelatedDatasetsVM = (dataset: any) => {
    /**
     * Fetch stats for datasets to highlight favourite status
     */
    const protocol = window.location.protocol || "http:";
        const host =
        window.location.hostname !== "localhost"
            ? window.location.hostname
            : "localhost:3000";
    const fullUrl = `${protocol}//${host}`;
    const { fectchStats, stats, isFetchingStats } = useFetchStats();

    const {
        execute: excuteFetchDatasetsByCategory,
        data: datasetsByCategory,
        isLoading: isFetchingDatasetsByCategory,
        error: errorByCategory,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchDatasetsByCategory = () =>
        excuteFetchDatasetsByCategory(
            () => {
                return Http.get(
                    `/api/related-by-domains-and-topics?query=${dataset?.id}`,
                    {
                        baseUrl: fullUrl,
                    }
                );
            },
            {
                postProcess: (res) => {
                    const datasets = Dataset.fromJsonList(
                        res["results"]
                            .slice(0, 10)
                            .filter((ds: any) => ds["id"] != dataset?.["id"])
                    );
                    const datasetIds = datasets
                        .filter((id: any) => id)
                        .map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                },
                onError: (e) => {
                    toast.error(
                        "Something went wrong while Fetching Datasets By Category datasets."
                    );
                },
            }
        );

    const {
        execute: excuteFetchDatasetsByDescription,
        data: datasetsByDescription,
        isLoading: isFetchingDatasetsByDescription,
        error: errorByDescription,
    } = useHttpCall<{ [key: string]: any }>([]);

    const fetchDatasetsByDescription = () =>
        excuteFetchDatasetsByDescription(
            () => {
                return Http.get(
                    `/api/related-by-description?query=${dataset?.id}`,
                    {
                        baseUrl: fullUrl,
                    }
                );
            },
            {
                postProcess: (res) => {
                    const datasets = Dataset.fromJsonList(
                        res["results"]
                            .slice(0, 10)
                            .filter((ds: any) => ds["id"] != dataset?.["id"])
                    );
                    const datasetIds = datasets
                        .filter((id: any) => id)
                        .map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                },
                onError: (e) => {
                    console.error(e);
                    toast.error(
                        "Something went wrong while Fetching Datasets By Category datasets."
                    );
                },
            }
        );

    // const { data: datasetsByCategory = [], error: errorByCategory } = useSWR(
    //     `${process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT}/v5/datasets/related-by-domains-and-topics/${dataset?.id}`,
    //     (url: string) =>
    //         fetch(url)
    //             .then((res) => {
    //                 console.log("Res : ", res);
    //                 return res.json();
    //             })
    //             .then((res) => {

    //                 const datasets = Dataset.fromJsonList(
    //                     res[0]["user_search"][0]["results"]
    //                         .slice(0, 10)
    //                         .filter((ds: any) => ds["id"] != dataset?.["id"])
    //                 );
    //                 const datasetIds = datasets
    //                     .filter((id: any) => id)
    //                     .map((dataset) => dataset.id);
    //                 if (datasetIds.length) {
    //                     console.log("Stats hit");
    //                     fectchStats(datasetIds);
    //                 }
    //                 return datasets;
    //             })
    // );

    // const { data: datasetsByDescription = [], error: errorByDescription } =
    //     useSWR(
    //         `${process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT}/v5/datasets/related-by-description/${dataset?.id}`,
    //         (url: string) =>
    //             fetch(url)
    //                 .then((res) => res.json())
    //                 .then((res) => {
    //                     const datasets = Dataset.fromJsonList(
    //                         res[0]["user_search"][0]["results"]
    //                             .slice(0, 10)
    //                             .filter(
    //                                 (ds: any) => ds["id"] != dataset?.["id"]
    //                             )
    //                     );
    //                     const datasetIds = datasets
    //                         .filter((id: any) => id)
    //                         .map((dataset) => dataset.id);
    //                     if (datasetIds.length) {
    //                         fectchStats(datasetIds);
    //                     }
    //                     return datasets;
    //                 })
    //     );

    const isLoading =
        isFetchingDatasetsByDescription || isFetchingDatasetsByCategory;
    // const isLoading =
    //     (!datasetsByCategory &&
    //         !datasetsByDescription &&
    //         !errorByCategory &&
    //         !errorByDescription) ||
    //     isFetchingStats;
    return {
        stats,
        isLoading,
        datasetsByCategory,
        datasetsByDescription,
        errorByCategory,
        errorByDescription,
        fetchDatasetsByCategory,
        fetchDatasetsByDescription,
    };
};

export default RelatedDatasetsVM;

interface IRelatedDatasetsVMContext {
    stats: any;
    isLoading: boolean;
    datasetsByCategory: any;
    datasetsByDescription: any;
    errorByCategory: any;
    errorByDescription: any;
    fetchDatasetsByCategory: any;
    fetchDatasetsByDescription: any;
}

export const RelatedDatasetsVMContext =
    createContext<IRelatedDatasetsVMContext>({} as IRelatedDatasetsVMContext);
