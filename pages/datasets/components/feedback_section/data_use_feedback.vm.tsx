import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { sanitizeDomainTopics } from "./components/domains_topics";
import { useContext } from "react";
import { DatasetDetailVMContext } from "../../dataset_detail.vm";

const DataUseFeedbackVM = () => {
    const form = useForm();
    const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

    const vmDataset = useContext(DatasetDetailVMContext);
    const dataset = vmDataset.dataset;

    const { execute: executeSubmit, isLoading: isSubmitting } = useHttpCall();
    const submitDataUseFeedback = (data: any) => {
        const payload = {
            comment: data.comment,
            comment_anonymous: data.comment_anonymous,
            potential_usecases: data.potential_usecases,
            domain_topics: sanitizeDomainTopics(data),
        };

        return executeSubmit(
          () => Http.post(`/v1/datasets/${dataset?.id}/usecase_feedback`, payload),
          {
            onSuccess: (res) =>{
              toast.success("The data source was successfully added.");
              setIsSubmissionSuccess(true);
            },
            onError: (e) =>
              toast.error("Something went wrong while adding the data source."),
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
