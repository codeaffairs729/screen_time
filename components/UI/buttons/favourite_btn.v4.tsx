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
    favouriteColor = "",
    cardClicked,
    cardHover,
}: {
    className?: string;
    datasetStats: any;
    isLoading?: Boolean;
    recordType?: string;
    onFavouriteChange?: () => void;
    favouriteColor?: any;
    cardClicked?: boolean;
    cardHover?: boolean;
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
            key={datasetStats.uuid}
            className="inline-block"
            data-tip
            data-for={`dtechtive-favourite-btn-tooltip-${datasetStats.id}`}
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
                    <BsHeart
                        className={`sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer active:bg-dtech-main-dark active:!text-white ${favouriteColor}`}
                        strokeWidth="0.3"
                    />
                ) : (
                    <>
                        {!isHandlingFavourite ? (
                            <>
                                {isFavourited ? (
                                    <BsHeartFill
                                        className={`sm:h-6 sm:w-6 h-4 w-4  text-dtech-new-main-light cursor-pointer  active:bg-dtech-main-dark active:text-white ${favouriteColor}   
                                        ${
                                            (cardClicked || cardHover) && " !text-dtech-dark-teal"
                                        }`
                                    }
                                    />
                                ) : (
                                    <BsHeart
                                        className={`sm:h-6 sm:w-6 h-4 w-4  text-dtech-new-main-light cursor-pointer  active:bg-dtech-main-dark active:text-white ${favouriteColor}  ${
                                            (cardClicked || cardHover) && " !text-dtech-dark-teal"
                                        }`}
                                        strokeWidth="0.3"
                                    />
                                )}
                            </>
                        ) : (
                            <Loader className="" />
                        )}
                    </>
                )}
            </button>
            <ReactTooltip
                id={`dtechtive-favourite-btn-tooltip-${datasetStats.id}`}
                textColor={"white"}
                backgroundColor="#4CA7A5"
                overridePosition={({ left, top }, _e, _t, node) => {
                    return {
                        top,
                        left:
                            typeof node === "string" ? left : Math.max(left, 0),
                    };
                }}
            >{
                    !user
                        ? "Please login to add this dataset to your favourites"
                        : !isFavourited
                            ? "Add to favourites"
                            : "Remove from favourites"
                }
                </ReactTooltip>
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
        setIsFavourited(datasetStats?.isFavourited ?? false);
    }, [datasetStats]);

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
    console.log("type :", type)
    switch (type) {
        case "datasets":
            return `/v1/datasets/${id}/favourite`;
        case "organisation":
            return `/v1/data_sources/${id}/favourite_data_provider`;
        case "topic" :
            return `/v1/topics/${id}/favourite/${type}`
        default:
            return `/v1/datasets/${id}/favourite`;
    }
};
