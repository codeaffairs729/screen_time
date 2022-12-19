import ErrorAlert from "components/UI/alerts/error_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model.v4";
import { useContext, useState } from "react";
import useSWR from "swr";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import DatasetStats from "models/dataset_stats.model";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import DatasetList from "components/UI/dataset_list";

const MayAlsoLike = () => {
    const { dataset } = useContext(DatasetDetailVMContext);
    // const [isLoadingStats, setIsLoadingStats] = useState(false);
    /**
     * Fetch stats for datasets to highlight favourite status
     */
    const {
        execute: excuteFectchStats,
        data: stats,
        isLoading: isFetchingStats,
    } = useHttpCall<{ [key: string]: any }>({});
    const fectchStats = (ids: number[]) =>
        excuteFectchStats(
            () =>
                Http.post("/v1/datasets/stats", {
                    meta_dataset_ids: ids,
                }),
            {
                postProcess: (res) => {
                    const o: { [key: string]: DatasetStats } = {};
                    Object.keys(res).map(
                        (id) =>
                            (o[id] = DatasetStats.fromJson({
                                ...res[id],
                                dataset_id: id,
                            }))
                    );
                    return o;
                },
            }
        );

    const searchTerm = dataset?.detail.topics
        .slice(0, 5)
        .filter((t) => t)
        .map((t) => encodeURIComponent(t))
        .join(",");
    const { data: datasets, error } = useSWR(
        `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}/v4/datasets/?search_query=${searchTerm}&page_size=20&page_num=1`,
        (url: string) =>
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const datasets = Dataset.fromJsonList(
                        res[0]["user_search"][0]["results"]
                            .slice(0, 10)
                            .filter((ds: any) => ds["id"] != dataset?.["id"])
                    );
                    const datasetIds = datasets.map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                })
    );
    const isLoading = !datasets && !error;
    // console.log("isLoadingStats", isLoadingStats)

    if (error) {
        return (
            <ErrorAlert
                className="m-2"
                message="Something went wrong while fetching related datasets. Please try again later"
            />
        );
    }

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <DatasetList
                datasets={datasets}
                onFavourite={() => {}}
                handleBookmark={() => {}}
                handleShare={() => {}}
            />
        </div>
    );
};

export default MayAlsoLike;
