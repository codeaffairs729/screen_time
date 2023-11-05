import Http from "common/http";
import Dataset from "models/dataset.model.v4";
// import SearchVM, from "pages/search/search.vm";
import useSWR from "swr";
import toast from "react-hot-toast";
import Organisation from "models/organisation.model";
import { organisationToResultCardData } from "pages/search/organisation/organisation.vm";
import { createContext } from "react";
import {
    datasetToResultCardData,
    useFetchStats,
} from "common/utils/datasets.util";
import Topic from "models/topic.model";
import { topicToResultCardData } from "pages/search/topics/topics.vm";


export const FavouriteVM = () => {
    const { fectchStats, stats, isFetchingStats } = useFetchStats();
    const favDatasetEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites_datasets`;
    const favProviderEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites_providers`;
    const favTopicEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites_topics`;

    const { data: favouriteDatasets, error: datasetError } = useSWR(
        favDatasetEndpoint,
        (url: string) =>
            Http.get("/v1/users/favourites_datasets", {
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
                        "Something went wrong while fetching your favourites."
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const { data: favouriteProviders, error: providerError } = useSWR(
        favProviderEndpoint,
        (url: string) =>
            Http.get("/v1/users/favourites_providers", {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    const organisations = Organisation.fromJsonList(res);
                    const recordsOrg =
                        organisationToResultCardData(organisations);
                    console.log("org :", recordsOrg);
                    return recordsOrg;
                })
                .catch((e) => {
                    toast.error(
                        "Something went wrong while fetching favourites providers"
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const { data: favouriteTopics, error: topicError } = useSWR(
        favTopicEndpoint,
        (url: string) =>
            Http.get("/v1/users/favourites_topics", {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    const topic = Topic.fromJsonList(res);
                    const recordTopic = topicToResultCardData(topic);
                    console.log({ recordTopic });
                    return recordTopic;
                })
                .catch((e) => {
                    toast.error(
                        "Something went wrong while fetching favourites providers"
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const isError = providerError || datasetError || topicError;

    const isFetchingFavourites =
        !(favouriteDatasets?.length == Object.keys(stats).length) ||
        isFetchingStats ||
        ((favouriteDatasets === undefined ||
            favouriteProviders === undefined ||
            favouriteTopics === undefined) &&
            !isError);

    if (!isFetchingStats) {
        console.log("stats", stats);
    }

    const recordDatasets: any = datasetToResultCardData(
        favouriteDatasets,
        stats
    );

    const favouritedRecords =
        favouriteProviders !== undefined &&
        favouriteDatasets !== undefined &&
        favouriteTopics !== undefined
            ? [...recordDatasets, ...favouriteProviders, ...favouriteTopics]
            : null;

    return {
        stats,
        isError,
        favouritedRecords,
        isFetchingFavourites,
    };
};

export default FavouriteVM;

interface IFavouriteVMContext {
    stats: any;
    isError: any;
    favouritedRecords: any;
    isFetchingFavourites: boolean;
}

export const FavouriteVMContext = createContext<IFavouriteVMContext>(
    {} as IFavouriteVMContext
);
