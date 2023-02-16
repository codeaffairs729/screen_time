import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";

const DataQualityFeedbackVM = () => {
    const form = useForm();
    const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

    const vmDataset = useContext(DatasetDetailVMContext);
    const dataset = vmDataset.dataset;

    const { execute: executeSubmit, isLoading: isSubmitting } = useHttpCall();
    const submitDataQualityFeedback = (data: any) => {
        if (
            !(
                data.accuracy ||
                data.clarity ||
                data.comment ||
                data.consistency ||
                data.readiness
            )
        ) {
            return toast.error("Please fill in the form before submission");
        }
        return executeSubmit(
            () =>
                Http.post(`/v1/datasets/${dataset?.id}/quality_feedback`, data),
            {
                onSuccess: (res) => {
                    toast.success(
                        "The feedback on the data quality was successfully added."
                    );
                    setIsSubmissionSuccess(true);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while adding the data source."
                    ),
            }
        );
    };

    return {
        form,
        submitDataQualityFeedback,
        isSubmitting,
        isSubmissionSuccess,
    };
};

export default DataQualityFeedbackVM;
