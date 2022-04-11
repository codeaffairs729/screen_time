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

const PurposeForm = () => {
  const {
    query: { id },
  } = useRouter();
  const { control, handleSubmit, reset } = useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading: isSubmittingPrupose, execute: executeSubmitPrupose } =
    useHttpCall();
  const submitPrupose = (data: any) =>
    executeSubmitPrupose(
      () =>
        Http.post(`/v1/datasets/${id}/comments`, {
          ...data,
          type: "purpose",
        }),
      {
        onSuccess: (res) => {
          reset();
          toast.success("Your use case was successfully submitted");
        },
        onError: (error) =>
          toast.error("Something went wrong while submitting your use case"),
      }
    );

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-medium text-sm mb-2">
          What are you using this dataset for? Let us know!{" "}
          <InfoIcon title="We would be grateful if you are able to tell us about the nature of the problem that you are hoping to solve by using this dataset. This information will only be shared with the data owner and the owner's organisation for the purpose of further maintenance and improvement the data." />
        </p>
        <PrimaryBtn
          label="Submit"
          className="bg-dtech-secondary-light w-32 mb-2"
          isLoading={isSubmittingPrupose}
          onClick={handleSubmit(submitPrupose)}
          isDisabled={!user}
        />
      </div>
      <div data-tip={!user ? "Please login to submit your use case" : null}>
        <TextField
          type="textarea"
          disabled={!user}
          formControl={{
            control,
            name: "description",
            rules: { required: "Use case is required" },
          }}
        />
      </div>
      <ReactTooltip uuid="dtechtive-pruposeform-tooltip" />
    </div>
  );
};

export default PurposeForm;
