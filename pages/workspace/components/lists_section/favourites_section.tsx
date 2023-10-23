import ErrorAlert from "components/UI/alerts/error_alert";
import InfoAlert from "components/UI/alerts/info_alert";
import Loader from "components/UI/loader";
import Pagination from "components/UI/pagination_for_datasets";
import ResultCard from "components/UI/result_card";
import { useRouter } from "next/router";
import FavouriteVM from "pages/workspace/favourite.vm";
import { useEffect, useMemo, useState } from "react";

const FavouritesSection = () => {
    const { stats, isError, isFetchingFavourites, favouritedRecords } =
        FavouriteVM();

    const router = useRouter();
    const {
        query: { q },
    } = router;
    const [currentPageNo, setCurrentPageNo] = useState<number>(
        router.query.page ? parseInt(router.query.page as string) : 1
    );
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // useEffect(() => {
    //     if (currentPageNo.toString() != router.query?.page) {
    //         router.replace({
    //             query: { ...router.query, page: currentPageNo },
    //         });
    //     }
    // }, [currentPageNo]);

    useEffect(() => {
        setTotalPages(
            Math.ceil((favouritedRecords?.length as number) / pageSize)
        );
    }, [favouritedRecords]);

    const currentFavouritesRecords = useMemo(() => {
        if (!favouritedRecords) return [];
        const startIndex = (currentPageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return favouritedRecords.slice(startIndex, endIndex);
    }, [currentPageNo, pageSize, favouritedRecords]);

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
                {currentFavouritesRecords?.map((data) => (
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
            <Pagination
                currentPage={currentPageNo}
                totalPages={totalPages}
                setPageNumber={setCurrentPageNo}
            />
        </div>
    );
};

export default FavouritesSection;

const getLabel = (recordType: string) => {
    return recordType == "datasets" ? "datasets" : "data_provider";
};
