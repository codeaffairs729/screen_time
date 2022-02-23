import { useHttpCall } from "common/hooks";
import Http from "common/http";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";

const LikeBtn = ({
  datasetId,
  isLiked = false,
}: {
  isLiked: boolean;
  datasetId: string;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [likeStatus, setLikeStatus] = useState(isLiked);
  const { isLoading: isPerformingLike, execute: executePerformLike } =
    useHttpCall();
  const performLike = () =>
    executePerformLike(
      () => {
        if (!user) {
          toast.error("please login to continue");
          return;
        }
        if (likeStatus) {
          return Http.delete(`/v1/datasets/${datasetId}/like`);
        } else {
          return Http.put(`/v1/datasets/${datasetId}/like`);
        }
      },
      {
        onSuccess: (res) => setLikeStatus(res["is_like"]),
      }
    );

  return (
    <button
      data-tip="Like dataset"
      className="h-7 w-7 flex items-center justify-center"
      onClick={performLike}
    >
      {!isPerformingLike ? (
        <Image
          src={`/images/icons/like/${
            likeStatus ? "like_active" : "like_inactive"
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
  );
};

export default LikeBtn;
