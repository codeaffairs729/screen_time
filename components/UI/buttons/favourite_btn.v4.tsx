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
    isLoading = false,
    onFavouriteChange,
}: {
    className?: string;
    datasetStats: any;
    isLoading?: Boolean;
    onFavouriteChange?: () => void;
}) => {
    const { handleFavourite, isFavourited, isHandlingFavourite, user } =
        useFavouriteDataset(datasetStats, isLoading, onFavouriteChange);

    return (
        <div
            className="inline-block"
            data-tip={
                !user
                    ? "Please login to add this dataset to your favourites"
                    : null
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
                    <BsHeart className="w-5 h-5 text-gray-600" />
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
                            <Loader className="m-0.5" />
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
    onFavouriteChange?: () => void
) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isFavourited, setIsFavourited] = useState(
        datasetStats?.isFavourited ?? false
    );
    useEffect(() => {
        setIsFavourited(datasetStats?.isFavourited ?? false);
    }, [datasetStats]);
    const { execute: executeHandleFavourite, isLoading: isHandlingFavourite } =
        useHttpCall();
    const handleFavourite = () =>
        executeHandleFavourite(
            async () => {
                if (!isFavourited) {
                    const res = await Http.put(
                        `/v1/datasets/${datasetStats.id}/favourite`
                    );
                    setIsFavourited(true);
                } else {
                    const res = await Http.delete(
                        `/v1/datasets/${datasetStats.id}/favourite`
                    );
                    setIsFavourited(false);
                }
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