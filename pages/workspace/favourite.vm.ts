import Http from "common/http";
import Dataset from "models/dataset.model.v4";
import SearchVM, { datasetToResultCardData } from "pages/search/search.vm";
import useSWR from "swr";
import toast from "react-hot-toast";
import Organisation from "models/organisation.model";
import { organisationToResultCardData } from "pages/search/components/organization/organisation.vm";
import { createContext } from "react";

export const FavouriteVM = () => {
    const { fectchStats, stats, isFetchingStats } = SearchVM();
    const favDatasetEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites_datasets`;
    const favProviderEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites_providers`;
    const { data: favouriteDatasets = [], error: datasetError } = useSWR(
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
                        "Something went wrong while fetching favourites datasets"
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const { data: favouriteProviders = [], error: providerError } = useSWR(
        favProviderEndpoint,
        (url: string) =>
            Http.get("/v1/users/favourites_providers", {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    const organisations = Organisation.fromJsonList(res);
                    const recordsOrg =
                        organisationToResultCardData(organisations);
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

    const isError = providerError || datasetError;
    const isFetchingFavourites =
        !favouriteDatasets &&
        !favouriteProviders &&
        !isError &&
        isFetchingStats;

    const recordDatasets: any = datasetToResultCardData(
        favouriteDatasets,
        stats
    );
    const favouritedRecords = [...recordDatasets, ...favouriteProviders];

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
