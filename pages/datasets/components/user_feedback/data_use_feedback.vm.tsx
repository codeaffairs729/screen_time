import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";
import { sanitizeDomainTopics } from "./components/domains_topics";

const DataUseFeedbackVM = () => {
    const form = useForm();
    const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

    const vmDataset = useContext(DatasetDetailVMContext);
    const dataset = vmDataset.dataset;

    const { execute: executeSubmit, isLoading: isSubmitting } = useHttpCall();
    const submitDataUseFeedback = (data: any) => {
        if (
            !(
                data.comment ||
                data.domains.length ||
                data.potential_usecases.length
            )
        ) {
            return toast.error("Please fill in the form before submission");
        }
        const payload = {
            comment: data.comment,
            comment_anonymous: data.comment_anonymous,
            potential_usecases: data.potential_usecases,
            domain_topics: sanitizeDomainTopics(data),
        };

        return executeSubmit(
            () =>
                Http.post(
                    `/v1/datasets/${dataset?.id}/usecase_feedback`,
                    payload
                ),
            {
                onSuccess: (res) => {
                    toast.success("The form was successfully submitted.");
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
        submitDataUseFeedback,
        isSubmitting,
        isSubmissionSuccess,
    };
};

export default DataUseFeedbackVM;
