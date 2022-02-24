import { useHttpCall } from "common/hooks";
import Http from "common/http";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";

const FeedbackForm = () => {
  const {
    query: { id },
  } = useRouter();
  const { control, handleSubmit, reset } = useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading: isSubmittingFeedback, execute: executeSubmitFeedback } =
    useHttpCall();
  const submitFeedback = (data: any) =>
    executeSubmitFeedback(
      () => Http.post(`/v1/datasets/${id}/comments`, data),
      {
        onSuccess: (res) => {
          reset();
          toast.success("You feedback was successfully submitted");
        },
        onError: (error) =>
          toast.error("Something went wrong while submitting your feedback"),
      }
    );

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-medium text-sm mb-2">
          Add you feedback <InfoIcon title="Add your feedback" />
        </p>
        <PrimaryBtn
          label="Submit"
          className="bg-dtech-secondary-light w-32 mb-2"
          isLoading={isSubmittingFeedback}
          onClick={handleSubmit(submitFeedback)}
          isDisabled={!user}
        />
      </div>
      <div data-tip={!user ? "Please login to submit feedback" : null}>
        <TextField
          type="textarea"
          disabled={!user}
          formControl={{
            control,
            name: "description",
            rules: { required: "Feedback is required" },
          }}
        />
      </div>
      <ReactTooltip uuid="dtechtive-feedbackform-tooltip" />
    </div>
  );
};

export default FeedbackForm;
