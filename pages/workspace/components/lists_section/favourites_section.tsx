import Http from "common/http";
import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { useHttpCall } from "common/hooks";
import DatasetStats from "models/dataset_stats.model";
import DatasetList from "components/UI/dataset_list";

const FavouritesSection = () => {
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

    const { mutate } = useSWRConfig();
    const favEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites`;
    const { data: favouriteDatasets, error } = useSWR(
        favEndpoint,
        (url: string) =>
            Http.get("/v1/users/favourites", {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    const datasets = Dataset.fromJsonList(res);
                    const datasetIds = datasets.map((dataset) => dataset.id);
                    if (datasetIds.length) {
                        fectchStats(datasetIds);
                    }
                    return datasets;
                })
                .catch((e) => {
                    toast.error(
                        "Something went wrong while fetching favourites"
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const isFetchingFavourites =
        !favouriteDatasets && !error && isFetchingStats;

    if (error) {
        return (
            <div className="w-full flex items-start justify-center">
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching datasets. Please try again later."
                />
            </div>
        );
    }
    if (isFetchingFavourites) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {!isFetchingFavourites && (favouriteDatasets?.length ?? 0) == 0 && (
                <InfoAlert message="No favourites found" className="mt-1" />
            )}
            <DatasetList datasets={favouriteDatasets} stats={stats} />
        </div>
    );
};

export default FavouritesSection;
