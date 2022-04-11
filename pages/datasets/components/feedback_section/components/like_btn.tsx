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

const LikeBtn = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { dataset, setDataset } = useContext(DatasetDetailVMContext);
  const isLiked = dataset?.detail?.isLiked ?? false;
  const likes = dataset?.detail?.likes ?? 0;
  const { isLoading: isPerformingLike, execute: executePerformLike } =
    useHttpCall();
  const performLike = () =>
    executePerformLike(
      () => {
        if (!user) {
          toast.error("please login to continue");
          return;
        }
        if (!dataset) {
          throw new Error("No dataset found");
        }
        if (isLiked) {
          return Http.delete(`/v1/datasets/${dataset.id}/like`);
        } else {
          return Http.put(`/v1/datasets/${dataset.id}/like`);
        }
      },
      {
        onSuccess: (res) => {
          const didLike = res["is_like"] !== undefined; // if the user performed like then response would contain 'is_like' property
          console.log("like res", res);

          if (dataset) {
            console.log("like dataset before", dataset);
            dataset.detail.isLiked = didLike ? true : false;
            dataset.detail.likes = didLike
              ? dataset.detail.likes + 1
              : dataset.detail.likes - 1;
            if (didLike) {
              // if the user liked TouchEvent, make the dislike btn inactive
              dataset.detail.dislikes = dataset.detail.isDisliked
                ? dataset.detail.dislikes - 1
                : dataset.detail.dislikes;
              dataset.detail.isDisliked = false;
            }
            setDataset(new Dataset(dataset));
            console.log("like dataset after", dataset);
          }
        },
      }
    );

  return (
    <div className="flex items-center">
      <button
        data-tip="Like dataset"
        className="h-7 w-7 flex items-center justify-center"
        onClick={performLike}
      >
        {!isPerformingLike ? (
          <Image
            src={`/images/icons/like/${
              isLiked ? "like_active" : "like_inactive"
            }.svg`}
            width="30px"
            height="30px"
            alt="like btn"
          />
        ) : (
          <Loader />
        )}
        <ReactTooltip uuid="dtechtive-like-tooltip" />
      </button>
      <span className="text-sm text-gray-500 font-medium ml-1">{likes}</span>
    </div>
  );
};

export default LikeBtn;
