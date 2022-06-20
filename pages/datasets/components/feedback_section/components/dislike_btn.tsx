import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Dataset from "models/dataset.model";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "components/UI/loader";
import { DatasetDetailVMContext } from "pages/datasets/dataset_detail.vm";

const DislikeBtn = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { dataset, setDataset } = useContext(DatasetDetailVMContext);
    const isDisliked = dataset?.detail?.isDisliked ?? false;
    const dislikes = dataset?.detail?.dislikes ?? 0;
    const { isLoading: isPerformingDislike, execute: executePerformDislike } =
        useHttpCall();
    const performDislike = () =>
        executePerformDislike(
            () => {
                if (!user) {
                    toast.error("please login to continue");
                    return;
                }
                if (!dataset) {
                    throw new Error("No dataset found");
                }
                if (isDisliked) {
                    return Http.delete(`/v1/datasets/${dataset.id}/dislike`);
                } else {
                    return Http.put(`/v1/datasets/${dataset.id}/dislike`);
                }
            },
            {
                onSuccess: (res) => {
                    const didDislike = res["is_like"] !== undefined; // if the user performed dislike then response would contain 'is_like' property
                    if (dataset) {
                        dataset.detail.isDisliked = didDislike ? true : false;
                        dataset.detail.dislikes = didDislike
                            ? dataset.detail.dislikes + 1
                            : dataset.detail.dislikes - 1;
                        if (didDislike) {
                            dataset.detail.likes = dataset.detail.isLiked
                                ? dataset.detail.likes - 1
                                : dataset.detail.likes;
                            dataset.detail.isLiked = false;
                        }
                        setDataset(new Dataset(dataset));
                    }
                },
            }
        );

    return (
        <div className="flex items-center">
            <button
                data-tip="Dislike dataset"
                data-selector="dislike-btn"
                className="h-7 w-7 flex items-center justify-center"
                onClick={performDislike}
            >
                {!isPerformingDislike ? (
                    <Image
                        data-selector={
                            isDisliked ? "dislike_active" : "dislike_inactive"
                        }
                        src={`/images/icons/dislike/${
                            isDisliked ? "dislike_active" : "dislike_inactive"
                        }.svg`}
                        width="30px"
                        height="30px"
                        alt="dislike btn"
                    />
                ) : (
                    <Loader />
                )}
                <ReactTooltip uuid="dtechtive-dislike-tooltip" />
            </button>
            <span
                data-selector="dislike-count"
                className="tuxt-sm text-gray-500 font-medium ml-1"
            >
                {dislikes}
            </span>
        </div>
    );
};

export default DislikeBtn;
