import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

const DataUseFeedbackVM = () => {
    const form = useForm();
    const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

    const { execute: executeSubmit, isLoading: isSubmitting } = useHttpCall();
    const submitDataUseFeedback = (data: any) => {
        console.log(data);

        // return executeSubmit(
        //   () => Http.post("/v1/data_sources/", sanitizedValues),
        //   {
        //     onSuccess: (res) =>{
        //       toast.success("The data source was successfully added.");
        //       setIsSubmissionSuccess(true);
        //     },
        //     onError: (e) =>
        //       toast.error("Something went wrong while adding the data source."),
        //   }
        // );
    };

    return {
        form,
        submitDataUseFeedback,
        isSubmitting,
        isSubmissionSuccess,
    };
};

export default DataUseFeedbackVM;
