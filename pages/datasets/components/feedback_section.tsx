import { useHttpCall } from "common/hooks";
import Http from "common/http";
import DislikeBtn from "components/UI/buttons/dislike_btn";
import LikeBtn from "components/UI/buttons/like_btn";
import InfoIcon from "components/UI/icons/info_icon";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../dataset_detail.vm";
import FeedbackForm from "./feedback_form";
import PurposeForm from "./purpose_form";

const FeedbackSection = () => {
  const {
    query: { id },
  } = useRouter();
  const { dataset } = useContext(DatasetDetailVMContext);

  return (
    <div className="p-3">
      <p className="text-gray-600 font-medium text-sm mb-2">
        Did you find this dataset useful?
        <InfoIcon title="Add you feedback" className="ml-1" />
      </p>
      <div className="flex space-x-3 mb-3">
        <div className="flex items-center">
          <LikeBtn
            isLiked={dataset?.detail?.isLiked ?? false}
            datasetId={id as string}
          />
          <span className="text-sm text-gray-500 font-medium ml-1">
            {dataset?.detail.likes}
          </span>
        </div>
        <div className="flex items-center">
          <DislikeBtn
            isDisliked={dataset?.detail?.isDisliked ?? false}
            datasetId={id as string}
          />
          <span className="text-sm text-gray-500 font-medium ml-1">
            {dataset?.detail.likes}
          </span>
        </div>
      </div>
      <FeedbackForm />
      <PurposeForm />
    </div>
  );
};

export default FeedbackSection;
