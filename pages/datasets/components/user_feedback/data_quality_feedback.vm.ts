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

    const {
        error,
        execute: excuteFetchQualityFeedback,
        data: qualityFeedback,
        isLoading: isFetchingQualityFeedback,
    } = useHttpCall<{ [key: string]: any }>({});
    const fetchQualityFeedback = () =>
        excuteFetchQualityFeedback(
            () => {
                return Http.get(
                    `/v1/datasets/${dataset?.id}/is_quality_feedback_given`,
                    {
                        redirectToLoginPageIfAuthRequired: false,
                    }
                );
            },
            {
                postProcess: (res) => {
                    return res;
                },
                onError: (e) => {
                    toast.error("Something wrong in Quality Feedback.");
                },
            }
        );

    return {
        form,
        submitDataQualityFeedback,
        isSubmitting,
        isSubmissionSuccess,
        qualityFeedback,
        isFetchingQualityFeedback,
        fetchQualityFeedback,
    };
};

export default DataQualityFeedbackVM;
