import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { Data } from "components/UI/result_card";
import DatasetStats from "models/dataset_stats.model";

export const useFetchStats = () => {
    const {
        execute: excuteFectchStats,
        data: stats,
        error,
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
    return { fectchStats, stats, isFetchingStats, error };
};


export const datasetToResultCardData = (datasets: any, stats: any): Data[] => {
    if (!datasets?.length) {
        return [];
    }

    return datasets?.map((dataset: any) => ({
        id: dataset.id,
        title: dataset.detail.name,
        recordType: "datasets",
        description: dataset.detail.description,
        dataQuality: dataset.detail.dataQuality,
        licenseTypes: [dataset.detail.license.type],
        topics: dataset.detail.topics,
        isFavourited: stats[dataset.id]?.isFavourited,
        lastUpdate: dataset.detail.lastUpdate,
        domains:
            typeof dataset.detail.domain === "string"
                ? [dataset.detail.domain]
                : dataset.detail.domain, //Some dataset are fetching from older version api need to update it in future
        dataProviders: {
            organisation: dataset.owner.organisation,
            hostName: dataset.detail.hostName,
            hostUuid: dataset.detail.hostUuid,
            ownerUuid: dataset.owner.uuid,
            hostUrl: dataset.detail.hostUrl,
            ownerUrl: dataset.owner.ownerUrl,
            datasetSource: dataset.detail.datasetUrl,
        },
    }));
};