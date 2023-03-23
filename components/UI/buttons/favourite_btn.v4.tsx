import clsx from "clsx";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Dataset from "models/dataset.model";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import DatasetStats from "models/dataset_stats.model";

const FavouriteBtn = ({
    className = "",
    datasetStats,
    recordType = "datasets",
    isLoading = false,
    onFavouriteChange,
}: {
    className?: string;
    datasetStats: any;
    isLoading?: Boolean;
    recordType?: string;
    onFavouriteChange?: () => void;
}) => {
    const { handleFavourite, isFavourited, isHandlingFavourite, user } =
        useFavouriteDataset(
            datasetStats,
            isLoading,
            onFavouriteChange,
            recordType
        );

    return (
        <div
            className="inline-block"
            data-tip={
                !user
                    ? "Please login to add this dataset to your favourites"
                    : !isFavourited
                    ? "Add to favourites"
                    : "Remove from favourites"
            }
        >
            <button
                aria-label="Favoruite dataset"
                data-selector="fav-btn"
                onClick={handleFavourite}
                disabled={!user}
                className={clsx(
                    "flex items-center justify-center relative",
                    className
                )}
            >
                {!user ? (
                    <BsHeart className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer" />
                ) : (
                    <>
                        {!isHandlingFavourite ? (
                            <>
                                {isFavourited ? (
                                    <BsHeartFill className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer" />
                                ) : (
                                    <BsHeart className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer" />
                                )}
                            </>
                        ) : (
                            <Loader className="ml-4" />
                        )}
                    </>
                )}
            </button>
            <ReactTooltip uuid="dtechtive-favourite-btn-tooltip" />
        </div>
    );
};

/**
 * Favourite a dataset
 */
const useFavouriteDataset = (
    datasetStats: any,
    isLoading: Boolean,
    onFavouriteChange?: () => void,
    recordType?: string
) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isFavourited, setIsFavourited] = useState(
        datasetStats?.isFavourited ?? false
    );
    useEffect(() => {
        (async () => {
            const products = (await datasetStats?.isFavourited) ?? false;
            setIsFavourited(products);
        })();
    }, [datasetStats]);
    console.log("!isfavourite", !isFavourited);
    console.log("isfavourite", isFavourited);
    console.log("dataset", datasetStats);
    const { execute: executeHandleFavourite, isLoading: isHandlingFavourite } =
        useHttpCall();
    const handleFavourite = () =>
        executeHandleFavourite(
            async () => {
                const url = getFavURL(datasetStats?.id, recordType);
                const res = !isFavourited
                    ? await Http.put(url)
                    : await Http.delete(url);
                setIsFavourited(!isFavourited);
            },
            {
                onError: (res) =>
                    toast.error("Something went wrong while favouriting"),
                onSuccess: (res) => onFavouriteChange?.(),
            }
        );
    return {
        isFavourited,
        setIsFavourited,
        isHandlingFavourite: isLoading || isHandlingFavourite,
        handleFavourite,
        user,
    };
};

export default FavouriteBtn;

const getFavURL = (id: number, type = "datasets") => {
    switch (type) {
        case "datasets":
            return `/v1/datasets/${id}/favourite`;
        case "organisation":
            return `/v1/data_sources/${id}/favourite_data_provider`;
        default:
            return `/v1/datasets/${id}/favourite`;
    }
};
