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
          toast.success("You usage was successfully submitted");
        },
        onError: (error) =>
          toast.error("Something went wrong while submitting your usage"),
      }
    );

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-medium text-sm mb-2">
          What are you using this dataset for? Let us know!{" "}
          <InfoIcon title="Add your usage" />
        </p>
        <PrimaryBtn
          label="Submit"
          className="bg-dtech-secondary-light w-32 mb-2"
          isLoading={isSubmittingPrupose}
          onClick={handleSubmit(submitPrupose)}
          isDisabled={!user}
        />
      </div>
      <div data-tip={!user ? "Please login to submit usage" : null}>
        <TextField
          type="textarea"
          disabled={!user}
          formControl={{
            control,
            name: "description",
            rules: { required: "This is required" },
          }}
        />
      </div>
      <ReactTooltip uuid="dtechtive-pruposeform-tooltip" />
    </div>
  );
};

export default PurposeForm;
