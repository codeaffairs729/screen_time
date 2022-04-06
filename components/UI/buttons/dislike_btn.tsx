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

const DislikeBtn = ({
  dataset,
}: {
  dataset: Dataset | undefined;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [dislikeState, setDislikeState] = useState({
    active: dataset?.detail?.isDisliked ?? false,
    count: dataset?.detail?.likes ?? 0,
  });
  const { isLoading: isPerformingLike, execute: executePerformDislike } =
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
        if (dislikeState.active) {
          return Http.delete(`/v1/datasets/${dataset.id}/dislike`);
        } else {
          return Http.put(`/v1/datasets/${dataset.id}/dislike`);
        }
      },
      {
        onSuccess: (res) =>
          setDislikeState((state) => {
            console.log('res', res, res["is_like"]);
            
            return {
              active: res["is_like"] == undefined
              ? false
              : true,
              count:
                res["is_like"] == undefined
                  ? state.count - 1
                  : state.count + 1,
            };
          }),
      }
    );

  return (
    <div className="flex items-center">
      <button
        data-tip="Dislike dataset"
        className="h-7 w-7 flex items-center justify-center"
        onClick={performDislike}
      >
        {!isPerformingLike ? (
          <Image
            src={`/images/icons/dislike/${
              dislikeState.active ? "dislike_active" : "dislike_inactive"
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
      <span className="text-sm text-gray-500 font-medium ml-1">
        {dislikeState.count}
      </span>
    </div>
  );
};

export default DislikeBtn;
