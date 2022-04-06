import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Dataset from "models/dataset.model";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";

const LikeBtn = ({ dataset }: { dataset: Dataset | undefined }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [likeState, setLikeState] = useState({
    active: dataset?.detail?.isLiked ?? false,
    count: dataset?.detail?.likes ?? 0,
  });
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
        if (likeState.active) {
          return Http.delete(`/v1/datasets/${dataset.id}/like`);
        } else {
          return Http.put(`/v1/datasets/${dataset.id}/like`);
        }
      },
      {
        onSuccess: (res) =>
          setLikeState((state) => ({
            active: res["is_like"] == undefined ? false : true,
            count: res["is_like"] ? state.count + 1 : state.count - 1,
          })),
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
              likeState.active ? "like_active" : "like_inactive"
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
      <span className="text-sm text-gray-500 font-medium ml-1">
        {likeState.count}
      </span>
    </div>
  );
};

export default LikeBtn;
