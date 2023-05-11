import { useHttpCall } from "common/hooks";
import Http from "common/http";
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
