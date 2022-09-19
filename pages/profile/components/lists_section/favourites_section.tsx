import Http from "common/http";
import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import DatasetRowDisplay from "components/UI/dataset_row_display";

const FavouritesSection = () => {
    const { mutate } = useSWRConfig();
    const favEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/users/favourites`;
    const { data: favouriteDatasets, error } = useSWR(
        favEndpoint,
        (url: string) =>
            Http.get("/v1/users/favourites", {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    return Dataset.fromJsonList(res);
                })
                .catch((e) => {
                    toast.error(
                        "Something went wrong while fetching favourites"
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const isFetchingFavourites = !favouriteDatasets && !error;

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
            {favouriteDatasets?.map((dataset, i) => (
                <DatasetRowDisplay
                    key={dataset.id}
                    dataset={dataset}
                    displayContext={"favorite-item"}
                    onFavouriteChange={() => mutate(favEndpoint)}
                />
            ))}
        </div>
    );
};

export default FavouritesSection;
