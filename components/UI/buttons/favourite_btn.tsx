import clsx from "clsx";
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Dataset from "models/dataset.model";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";

const FavouriteBtn = ({
    className = "",
    dataset,
    onFavouriteSuccess,
}: {
    className?: string;
    dataset: Dataset;
    onFavouriteSuccess?: () => void;
}) => {
    const { handleFavourite, isFavourited, isHandlingFavourite, user } =
        useFavouriteDataset(dataset, onFavouriteSuccess);

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
                {!isHandlingFavourite ? (
                    <Image
                        src={`/images/icons/favourite/${
                            isFavourited ? "favourited" : "not_favourited"
                        }.svg`}
                        data-selector={
                            isFavourited ? "fav_active" : "fav_inactive"
                        }
                        width="25px"
                        height="25px"
                        alt="favourite"
                    />
                ) : (
                    <Loader className="m-0.5" />
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
    dataset: Dataset,
    onFavouriteSuccess?: () => void
) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isFavourited, setIsFavourited] = useState(
        dataset.detail.isFavourited
    );
    useEffect(() => {
        setIsFavourited(dataset.detail.isFavourited);
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
                onSuccess: (res) => onFavouriteSuccess?.(),
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
