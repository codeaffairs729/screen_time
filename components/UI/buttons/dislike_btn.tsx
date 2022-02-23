import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";

const DislikeBtn = ({
  datasetId,
  isDisliked = false,
}: {
  isDisliked: boolean;
  datasetId: string;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [dislikeStatus, setDislikeStatus] = useState(isDisliked);
  const { isLoading: isPerformingLike, execute: executePerformDislike } =
    useHttpCall();
  const performDislike = () =>
    executePerformDislike(
      () => {
        if (!user) {
          toast.error("please login to continue");
          return;
        }
        if (dislikeStatus) {
          return Http.delete(`/v1/datasets/${datasetId}/dislike`);
        } else {
          return Http.put(`/v1/datasets/${datasetId}/dislike`);
        }
      },
      {
        onSuccess: (res) => setDislikeStatus(res["is_like"]),
      }
    );

  return (
    <button
      data-tip="Dislike dataset"
      className="h-7 w-7 flex items-center justify-center"
      onClick={performDislike}
    >
      {!isPerformingLike ? (
        <Image
          src={`/images/icons/dislike/${
            dislikeStatus ? "dislike_active" : "dislike_inactive"
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
  );
};

export default DislikeBtn;
