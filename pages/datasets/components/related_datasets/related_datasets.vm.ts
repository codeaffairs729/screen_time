import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Dataset from "models/dataset.model.v4";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";
import SearchVM, { SearchVMContext } from "pages/search/search.vm";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const RelatedDatasetsVM = () => {
    /**
     * Fetch stats for datasets to highlight favourite status
     */
    const { dataset } = useContext(DatasetDetailVMContext);
    const { fectchStats, stats, isFetchingStats } = SearchVM();
    const { data: datasetsByCategory = [], error: errorByCategory } = useSWR(
        `${process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT}/v5/datasets/related-by-domains-and-topics/7`,
        (url: string) =>
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const datasets = Dataset.fromJsonList(
                        res[0]["user_search"][0]["results"]
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
                })
    );

    const { data: datasetsByDescription = [], error: errorByDescription } =
        useSWR(
            `${process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT}/v5/datasets/related-by-description/7`,
            (url: string) =>
                fetch(url)
                    .then((res) => res.json())
                    .then((res) => {
                        const datasets = Dataset.fromJsonList(
                            res[0]["user_search"][0]["results"]
                                .slice(0, 10)
                                .filter(
                                    (ds: any) => ds["id"] != dataset?.["id"]
                                )
                        );
                        const datasetIds = datasets
                            .filter((id: any) => id)
                            .map((dataset) => dataset.id);
                        if (datasetIds.length) {
                            fectchStats(datasetIds);
                        }
                        return datasets;
                    })
        );

    const isLoading =
        (!datasetsByCategory &&
            !datasetsByDescription &&
            !errorByCategory &&
            !errorByDescription) ||
        isFetchingStats;
    return {
        stats,
        isLoading,
        datasetsByCategory,
        datasetsByDescription,
        errorByCategory,
        errorByDescription,
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
}

export const RelatedDatasetsVMContext =
    createContext<IRelatedDatasetsVMContext>({} as IRelatedDatasetsVMContext);
