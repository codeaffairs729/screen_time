import { useHttpCall } from "common/hooks";
import Http from "common/http";
import DislikeBtn from "./components/dislike_btn";
import LikeBtn from "./components/like_btn";
import InfoIcon from "components/UI/icons/info_icon";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import FeedbackForm from "./components/feedback_form";
import PurposeForm from "./components/purpose_form";

const FeedbackSection = () => {
  return (
    <div className="p-3">
      <p className="text-gray-600 font-medium text-sm mb-2">
        Did you find this dataset useful?
        <InfoIcon title="Add you feedback" className="ml-1" />
      </p>
      <div className="flex space-x-3 mb-3">
        <LikeBtn />
        <DislikeBtn />
      </div>
      <FeedbackForm />
      <PurposeForm />
    </div>
  );
};

export default FeedbackSection;
