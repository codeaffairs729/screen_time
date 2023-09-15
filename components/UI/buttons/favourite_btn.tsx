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

const FavouriteBtn = ({
    className = "",
    dataset,
    onFavouriteChange,
}: {
    className?: string;
    dataset: any;
    onFavouriteChange?: () => void;
}) => {
    const { handleFavourite, isFavourited, isHandlingFavourite, user } =
        useFavouriteDataset(dataset, onFavouriteChange);

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
                                    <BsHeartFill className="w-5 h-5 text-[#AD1DEB]" />
                                ) : (
                                    <BsHeart className="w-5 h-5 text-[#AD1DEB]" />
                                )}
                            </>
                        ) : (
                            <Loader className="m-0.5" />
                        )}
                    </>
                )}
            </button>
            <ReactTooltip uuid="dtechtive-favourite-btn-tooltip" textColor={'white'}  backgroundColor="#4CA7A5" />
        </div>
    );
};

/**
 * Favourite a dataset
 */
const useFavouriteDataset = (dataset: any, onFavouriteChange?: () => void) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isFavourited, setIsFavourited] = useState(
        dataset?.detail?.isFavourited
    );
    useEffect(() => {
        setIsFavourited(dataset?.detail?.isFavourited);
    }, [dataset]);
    const { execute: executeHandleFavourite, isLoading: isHandlingFavourite } =
        useHttpCall();
    const handleFavourite = () =>
        executeHandleFavourite(
            async () => {
                if (!isFavourited) {
                    const res = await Http.put(
                        `/v1/datasets/${dataset.id}/favourite`
                    );
                    setIsFavourited(true);
                } else {
                    const res = await Http.delete(
                        `/v1/datasets/${dataset.id}/favourite`
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
        isHandlingFavourite,
        handleFavourite,
        user,
    };
};

export default FavouriteBtn;
