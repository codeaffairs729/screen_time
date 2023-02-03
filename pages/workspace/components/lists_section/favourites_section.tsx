import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import Loader from "components/UI/loader";
import ResultCard from "components/UI/result_card";
import FavouriteVM from "pages/workspace/favourite.vm";

const FavouritesSection = () => {
    const { stats, isError, isFetchingFavourites, favouritedRecords } =
        FavouriteVM();

    if (isError) {
        return (
            <div className="w-full flex items-start justify-center">
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching favourite data. Please try again later."
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
            {!isFetchingFavourites && (favouritedRecords?.length ?? 0) == 0 && (
                <InfoAlert message="No favourites found" className="mt-1" />
            )}
            <div className="flex flex-col" data-test-id="results table">
                {favouritedRecords?.map((data) => (
                    <ResultCard key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
};

export default FavouritesSection;
