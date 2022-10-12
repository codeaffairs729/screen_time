import Http from "common/http";
import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import Loader from "components/UI/loader";
import Dataset from "models/dataset.model";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import DatasetRowDisplay from "components/UI/dataset_row_display";

const BookmarksSection = ({ datasetIDS }: { datasetIDS: any }) => {
    const { mutate } = useSWRConfig();
    const bookmarksEndpoint = `${process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT}/v1/user-bookmarks/bookmarkitemsdata`;
    const { data: bookmarkDatasets, error } = useSWR(
        bookmarksEndpoint,
        (url: string) =>
            Http.get("/v1/user-bookmarks/bookmarkitemsdata", {
                baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
            })
                .then((res) => {
                    console.log(res);
                    return Dataset.fromJsonList(res);
                })
                .catch((e) => {
                    toast.error(
                        "Something went wrong while fetching bookmarks"
                    );
                    throw e;
                }),
        { revalidateOnFocus: false }
    );

    const isFetchingBookmarks = !bookmarkDatasets && !error;

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
    if (isFetchingBookmarks) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            {!isFetchingBookmarks && (bookmarkDatasets?.length ?? 0) == 0 && (
                <InfoAlert message="No bookmarks found" className="mt-1" />
            )}
            {bookmarkDatasets?.map((dataset, i) => (
                <DatasetRowDisplay
                    key={dataset.id}
                    dataset={dataset}
                    displayContext={"favorite-item"}
                    onFavouriteChange={() => mutate(bookmarksEndpoint)}
                />
            ))}
        </div>
    );
};

export default BookmarksSection;
