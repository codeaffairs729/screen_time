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
            <div className="w-full flex items-start justify-center my-3">
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching your favourites. Please try again later."
                />
            </div>
        );
    }

    if (isFetchingFavourites) {
        return (
            <div className="w-full flex items-center justify-center my-3">
                <Loader />
            </div>
        );
    }

    return (
        <div className="mt-2">
            {!isFetchingFavourites && (favouritedRecords?.length ?? 0) == 0 && (
                <InfoAlert message="No favourites found." className="mt-1" />
            )}
            <div className="flex flex-col" data-test-id="results table">
                {favouritedRecords?.map((data) => (
                    <ResultCard
                        key={data.id}
                        data={data}
                        className={`md:!pr-0 !py-0 !border-r-0   !bg-white !shadow-md !p-4  ${
                            data.recordType === "datasets"
                                ? "md:!rounded-lg !rounded-none"
                                : " !rounded-none"
                        }`}
                        showToolTip={false}
                        pageName="workspace"
                        label={getLabel(data.recordType)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavouritesSection;

const getLabel = (recordType: string) => {
    return recordType == "datasets" ? "datasets" : "data_provider";
};
